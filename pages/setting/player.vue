<template>
    <div class="flex flex-col w-full gap-4">
        <div class="flex flex-col gap-2">
            <div class="w-full text-yellow-500 font-bold flex items-center gap-2">
                <h1 class="uppercase">Players Setting</h1>
            </div>
            <div class="flex">
                <div class="w-1/3">Add new player:</div>
                <div class="flex w-2/3 gap-2">
                    <input type="text" class="w-2/3 p-1 rounded text-black" placeholder="Player name"
                        v-model="namePlayer" @keyup.enter="addPlayer">
                    <button class="w-1/3 bg-green-600 rounded p-1 uppercase hover:bg-green-700" @click="addPlayer">Add</button>
                    <button class="w-1/3 bg-red-500 rounded p-1 uppercase hover:bg-red-700" @click="playerStore.resetRole()">Reset Role</button>
                </div>
            </div>
            <div class="bg-indigo-500 my-4">
                <table class="border-collapse table-auto w-full text-sm">
                    <thead>
                        <tr>
                            <th
                                class="border-b dark:border-slate-600 font-medium p-4 pl-8 text-left">
                                STT</th>
                            <th
                                class="border-b dark:border-slate-600 font-medium p-4 pl-8 text-left">
                                Tên</th>
                            <th
                                class="border-b dark:border-slate-600 font-medium p-4 pl-8 text-left">
                                Vai trò</th>
                            <th
                                class="border-b dark:border-slate-600 font-medium p-4 pl-8 text-center">
                                Tác vụ</th>
                        </tr>
                    </thead>
                    <tbody class="bg-slate-800">
                        <tr v-for="player in playerStore.playerArr">
                            <td
                                class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                #{{ player.id }}
                            </td>
                            <td
                                class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                {{ player.name }}
                            </td>
                            <td
                                class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                {{ roleStore.roleById(player.role).name }}
                            </td>
                            <td
                                class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 text-center">
                                <button class="bg-red-500 text-white rounded p-1 text-xs uppercase"
                                    @click="playerStore.removePlayer(player.id)">Xóa</button>
                            </td>
                        </tr>
                        <tr v-if="playerStore.playerArr.length == 0">
                            <td colspan="4" class="text-center p-2">Chưa có người chơi nào !</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex">
                <NuxtLink to="/play/night/one"
                    :class="{ 'pointer-events-none bg-slate-500': playerStore.totalPlayer() < roleStore.totalRoleActive() ? true : false }"
                    class="bg-orange-500 rounded p-2 text-md mx-auto text-center border-white border-2 uppercase hover:bg-red-500">
                    <template v-if="playerStore.totalPlayer() < roleStore.totalRoleActive()">
                        Chưa đủ người cho <span class="text-red-500 font-bold">{{ roleStore.totalRoleActive() }}</span> vai trò
                    </template>
                    <template v-else>
                        Bắt đầu ván đấu
                    </template>
                </NuxtLink>
            </div>

        </div>
    </div>
</template>
<script setup>
import { usePlayerStore } from '@/stores/player';
import { useRoleStore } from '@/stores/role';
const playerStore = usePlayerStore();
const roleStore = useRoleStore();

const namePlayer = ref('');
const passLink = ref(false);

const addPlayer = () => {
    if(namePlayer.value.trim().length == 0) {
        alert('Nhập tên chứa ít nhất 1 ký tự');
        return;
    }
    playerStore.addPlayer(titleCase(namePlayer.value.trim()));
    namePlayer.value = '';
    // checkTotalPlayer();
}

const checkTotalPlayer = () => {
    const total = playerStore.totalPlayer();
    if (total < 2) {
        passLink.value = false;
    } else {
        passLink.value = true;
    }
}

function titleCase(str) {
  var convertToArray = str.toLowerCase().split(' ');
  var result = convertToArray.map(function(val) {
    return val.replace(val.charAt(0), val.charAt(0).toUpperCase());
  });
  
  return result.join(' ');
}
</script>