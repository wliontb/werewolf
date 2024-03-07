<template>
    <div class="flex flex-col w-full gap-4">
        <div class="flex flex-col gap-2">
            <div class="w-full text-yellow-500 font-bold up">Thêm người chơi mới:</div>
            <div class="flex">
                <div class="w-1/3">Tên người chơi:</div>
                <div class="flex w-2/3 gap-2">
                    <input type="text" class="w-1/2 p-1 rounded text-black" placeholder="nhập tên người chơi" v-model="namePlayer">
                    <button class="w-1/2 bg-green-600 rounded p-1" @click="addPlayer">Thêm mới</button>
                </div>
            </div>
            <div class="bg-gray-500">
                <table class="border-collapse table-auto w-full text-sm">
                    <thead>
                        <tr>
                            <th
                                class="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 dark:text-slate-200 text-left">
                                STT</th>
                            <th
                                class="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 dark:text-slate-200 text-left">
                                Tên</th>
                            <th
                                class="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 dark:text-slate-200 text-left">
                                Vai trò</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-slate-800">
                        <tr v-for="player in players">
                            <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                #{{ player.id }}
                            </td>
                            <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                {{ player.name }}
                            </td>
                            <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                {{ player.role }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="flex flex-col">
            <div class="w-full text-yellow-500 font-bold up">Chọn vai trò xuất hiện trong game:</div>
            <div class="flex flex-col gap-2">
                <div class="flex">
                    <div class="w-1/3">Tiên tri:</div>
                    <input type="checkbox" class="w-2/3 p-1 rounded">
                </div>
                <div class="flex">
                    <div class="w-1/3">Bảo vệ:</div>
                    <input type="checkbox" class="w-2/3 p-1 rounded">
                </div>
                <div class="flex">
                    <div class="w-1/3">Phù thủy:</div>
                    <input type="checkbox" class="w-2/3 p-1 rounded">
                </div>
                <div class="flex">
                    <div class="w-1/3">Thợ săn:</div>
                    <input type="checkbox" class="w-2/3 p-1 rounded">
                </div>
                <div class="flex">
                    <div class="w-1/3">Cupid:</div>
                    <input type="checkbox" class="w-2/3 p-1 rounded">
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    const players = ref([
        {
            id: 1,
            name: 'Hoàng Trang',
            role: 0,
            alive: true,
            protected: false
        }
    ])

    const namePlayer = ref('');

    const addPlayer = () => {
        const playerName = namePlayer.value;
        const lastId = players.value[players.value.length - 1].id;
        const newPlayer = {
            id: lastId + 1,
            name: playerName,
            role: 1,
            alive: true,
            protected: false
        }
        players.value.push(newPlayer);
        namePlayer.value = '';
    }

</script>