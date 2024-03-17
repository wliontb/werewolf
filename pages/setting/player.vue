<template>
    <div class="flex flex-col w-full gap-4">
        <div class="flex flex-col gap-2">
            <div class="text-amber-500 font-bold flex items-center uppercase">
                <h1>Cài đặt người chơi</h1>
            </div>
            <div class="flex flex-col md:flex-row">
                <div class="w-full md:w-1/2">Hiện tại đang có: <span class="text-red-500 font-semibold">{{ gameStore.totalPlayer
                        }}</span> người chơi</div>
                <div class="flex flex-col md:flex-row w-full md:w-1/2 gap-1">
                    <input type="text" class="w-full md:w-4/6 p-1.5 rounded text-black border-white border"
                        placeholder="điền tên người chơi và enter" v-model="playerNameInput" @keyup.enter="addPlayer">
                    <div class="flex gap-0.5 md:w-2/6">
                        <button
                        class="w-1/2 text-xs flex items-center justify-between bg-green-500 rounded p-1.5 uppercase hover:bg-green-700 border-white border"
                        @click="addPlayer">Thêm người</button>
                        <button
                            class="w-1/2 text-xs flex items-center justify-between bg-red-500 rounded p-1.5 uppercase hover:bg-red-700 border-white border"
                            @click="playerStore.resetRole()">Cài lại role
                            <IconWarning />
                        </button>
                    </div>
                </div>
            </div>
            <div class="bg-amber-500 my-4">
                <table class="border-collapse table-auto w-full text-sm">
                    <thead>
                        <tr>
                            <th class="font-bold p-4 pl-8 text-left uppercase">
                                ID</th>
                            <th class="font-bold p-4 pl-8 text-left uppercase">
                                Tên</th>
                            <th class="font-bold p-4 pl-8 text-left uppercase">
                                Vai trò</th>
                            <th class="font-bold p-4 pl-8 text-center uppercase">
                                Tác vụ</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white text-black font-semibold">
                        <tr v-for="player in playerStore.player" class="hover:bg-green-300 border-b border-dashed">
                            <td class="py-3 pl-8">
                                #{{ player.id }}
                            </td>
                            <td class="py-3 pl-8">
                                {{ player.name }}
                            </td>
                            <td class="py-3 pl-8">
                                {{ roleStore.getByID(player.roleID).name }}
                            </td>
                            <td class="py-3 pl-8 text-center">
                                <button class="bg-red-500 text-white rounded p-1 text-xs uppercase"
                                    title="Xóa người chơi này" @click="playerStore.remove(player.id)">
                                    <IconTrash />
                                </button>
                            </td>
                        </tr>
                        <tr v-if="playerStore.player.length == 0">
                            <td colspan="4" class="text-center p-2">Chưa có người chơi nào !</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex">
                <button @click="startGame"
                    :class="{ 'pointer-events-none bg-slate-500': playerStore.player.length < roleStore.totalActive() ? true : false }"
                    class="bg-red-500 rounded p-2 text-md mx-auto text-center border-white border-2 uppercase hover:bg-red-800 hover:text-red-500">
                    <template v-if="playerStore.player.length < roleStore.totalActive()">
                        Chưa đủ người cho <span class="text-red-500 font-bold">{{ roleStore.totalActive() }}</span> vai
                        trò
                    </template>
                    <template v-else>
                        Bắt đầu đêm đầu tiên
                    </template>
                </button>
            </div>

        </div>
    </div>
</template>
<script setup>
import { useGameStore } from '@/stores/game';
import { usePlayerStore } from '@/stores/player';
import { useRoleStore } from '@/stores/role';
const playerStore = usePlayerStore();
const roleStore = useRoleStore();
const gameStore = useGameStore();

definePageMeta({
    middleware: ['resetgame']
})

const playerNameInput = ref('');

const startGame = async () => {
    gameStore.addLogGame('Quản trò đã bắt đầu game đấu');
    await navigateTo('/play/night/one');
}

const addPlayer = () => {
    if (playerNameInput.value.trim().length == 0) {
        alert('Tên phải chứa ít nhất 1 ký tự');
        return;
    }
    if (playerNameInput.value.trim() == 'quản trò') {
        alert('Không được chọn tên Quản Trò');
        return;
    }
    playerStore.add(titleCase(playerNameInput.value.trim()));
    playerNameInput.value = '';
}

const titleCase = (str) => {
    var convertToArray = str.toLowerCase().split(' ');
    var result = convertToArray.map(function (val) {
        return val.replace(val.charAt(0), val.charAt(0).toUpperCase());
    });

    return result.join(' ');
}
</script>