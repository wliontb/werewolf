<template>
    <div class="flex flex-col w-full gap-4">
        <div class="flex flex-col gap-2">
            <div class="w-full text-yellow-500 font-bold up">Đêm đầu tiên:</div>
            <div class="flex-col">
                <span class="font-semibold text-red-500">Nội dung ván đấu:</span> <span>{{ textScript }}</span>
                <!-- Pickrole -->
                <div v-if="setRole">
                    <div class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-1/2 mx-auto"
                        v-if="playerStore.playerFree().length > 0">
                        Hãy chọn người chơi vị trí này:
                        <select class="text-black rounded" v-model="playerChoose">
                            <option v-for="player in playerStore.playerFree()" :id="player.id" :value="player.id">{{ player.name }}</option>
                        </select>
                        <button class="bg-green-500 rounded text-sm py-1 px-1.5 uppercase"
                            @click="choosePlayerRole">Chọn</button>
                    </div>
                    <div v-else>
                        Số lượng người chơi không đủ để giữ vai trò này, vui lòng <NuxtLink to="/setting/player"
                            class="text-red-500 underline">cài đặt</NuxtLink> thêm
                    </div>
                </div>
                <div v-if="setRoleMulti">
                    <div class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-1/2 mx-auto"
                        v-if="playerStore.playerFree().length > 0">
                        Hãy chọn người chơi vị trí này:
                        <select class="text-black rounded" v-model="playerChooseMulti" multiple>
                            <option v-for="player in playerStore.playerFree()" :id="player.id" :value="player.id">{{ player.name }}</option>
                        </select>
                        <button class="bg-green-500 rounded text-sm py-1 px-1.5 uppercase"
                            @click="choosePlayerRoleMulti">Chọn</button>
                    </div>
                    <div v-else>
                        Số lượng người chơi không đủ để giữ vai trò này, vui lòng <NuxtLink to="/setting/player"
                            class="text-red-500 underline">cài đặt</NuxtLink> thêm
                    </div>
                </div>
                <!-- End Pickrole -->
                <!-- Set Protected -->
                <div v-if="setProtect">
                    <div class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-1/2 mx-auto">
                        Đêm nay bảo vệ muốn bảo vệ ai:
                        <select class="text-black rounded" v-model="playerProtectChoose">
                            <option v-for="player in playerStore.playerArr" :id="player.id" :value="player.id">{{ player.name }}</option>
                        </select>
                        <button class="bg-green-500 rounded text-sm py-1 px-1.5 uppercase"
                            @click="choosePlayerProtect">Chọn</button>
                    </div>
                </div>
                <!-- Set Lookup -->
                <div v-if="setLookup">
                    <div class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-1/2 mx-auto">
                        Đêm nay tiên tri muốn soi ai:
                        <select class="text-black rounded" v-model="playerLookupChoose">
                            <option v-for="player in playerStore.playerArr" :id="player.id" :value="player.id">{{ player.name }}</option>
                        </select>
                        <button class="bg-green-500 rounded text-sm py-1 px-1.5 uppercase"
                            @click="choosePlayerLookup">Chọn</button>
                    </div>
                </div>
            </div>
            <button
                class="bg-green-500 rounded p-2 w-1/2 text-md mx-auto  text-center border-white border-2 uppercase font-bold hover:bg-green-600"
                @click="nextStep">
                Tiếp theo</button>
            <NuxtLink to="/play/night/every"
                class="bg-orange-500 rounded p-2 w-1/2 text-md mx-auto  text-center border-white border-2 uppercase font-bold hover:bg-red-500">
                Qua Đêm</NuxtLink>
        </div>
    </div>
</template>
<script setup>
import { usePlayerStore } from '@/stores/player';
const playerStore = usePlayerStore();

const textScript = ref('');
const setRole = ref(false);
const setRoleMulti = ref(false);
const setProtect = ref(false);
const setLookup = ref(false);
const roleChoose = ref(0);
const playerChoose = ref(1);
const playerProtectChoose = ref(1);
const playerLookupChoose = ref(1);
const playerChooseMulti = ref([]);
const step = ref(0);
const listScript = [
    {
        id: 0,
        step: 0,
        text: 'Màn đêm tối tăm buông xuống nơi khu làng ven sông, từ xa có tiếng sói vọng lại',
        delay: 3,
        actionAfter: []
    },
    {
        id: 1,
        step: 1,
        text: 'Đêm đầu tiên, tất cả mọi người đi ngủ',
        delay: 3,
        actionAfter: []
    },
    {
        id: 2,
        step: 2,
        text: 'Bảo vệ thức dậy',
        delay: 3,
        actionAfter: ['guardian']
    },
    {
        id: 3,
        step: 3,
        text: 'Sói thức dậy',
        delay: 3,
        actionAfter: ['werewolve']
        
    },
    {
        id: 4,
        step: 4,
        text: 'Tiên tri thức dậy',
        delay: 3,
        actionAfter: ['fortune_teller']
    },
    {
        id: 5,
        step: 5,
        text: 'Phù thủy thức dậy',
        delay: 3,
        actionAfter: ['witch']
    },
    {
        id: 6,
        step: 6,
        text: 'Thợ săn thức dậy',
        delay: 3,
        actionAfter: ['hunter']
    }
];

const gameInfo = ref({
    totalPlayer: 0,
    guardianId: 0,
    wolfId: [],
})

const nextStep = () => {
    if (step.value > listScript[listScript.length - 1].step) {
        alert('Vui lòng qua đêm');
        return;
    }
    setRole.value = false;
    setRoleMulti.value = false;
    //add text
    const newText = listScript.find(item => item.step == step.value).text;
    textScript.value = newText;

    //handle Action
    if (listScript[step.value].actionAfter.length > 0) {
        listScript[step.value].actionAfter.forEach(action => {
            handleAction(action);
        })
    }

    //next step
    step.value++;
}

const handleAction = (action) => {
    switch (action) {
        case 'guardian':
            setRole.value = true;
            roleChoose.value = 3;
            setProtect.value = true;
            break;
        case 'werewolve':
            setRoleMulti.value = true;
            roleChoose.value = 2;
            break;
        case 'fortune_teller':
            setRole.value = true;
            roleChoose.value = 6;
            setProtect.value = false;
            setLookup.value = true;
            break;
        case 'witch':
            setRole.value = true;
            roleChoose.value = 4;
            break;
        case 'hunter':
            setRole.value = true;
            roleChoose.value = 5;
            break;
        default:
            setRole.value = false;
            break;
    }
}

const choosePlayerRole = () => {
    playerStore.changeRole(playerChoose.value, roleChoose.value);
    setRole.value = false;
    // nextStep();
}

const choosePlayerRoleMulti = () => {
    playerChooseMulti.value.forEach(item => {
        playerStore.changeRole(item, roleChoose.value);
    });
    // nextStep();
}

const choosePlayerProtect = () => {
    playerStore.setProtect(playerProtectChoose.value);
    nextStep();
}

const choosePlayerLookup = () => {
    const playerLookup = playerStore.playerArr.find(item => item.id == playerLookupChoose.value);
    if(playerLookup.role == 2) {
        textScript.value += `${playerLookup.name} chính là sói`;
    } else {
        textScript.value += `${playerLookup.name} không phải là sói`;
    }
}
</script>