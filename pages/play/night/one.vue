<template>
    <div class="flex flex-col w-full gap-4">
        <div class="flex flex-col gap-2">
            <div class="w-full text-yellow-500 font-bold uppercase text-2xl">Đêm đầu tiên</div>
            <div class="flex-col">
                <p class="font-semibold text-yellow-300 underline ">Nội dung ván đấu:</p>
                <p class="text-sm">{{ gameScript }}</p>
                <p class="font-semibold text-yellow-300 mt-3 underline ">Hành động Quản trò:</p>
                <p class="mb-5 text-sm">{{ modScript }}</p>
                <!-- Pickrole -->
                <div v-if="setRole">
                    <div class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-white"
                        v-if="playerStore.playerFree().length > 0">
                        <div class="flex justify-center items-center mb-3 ">
                            <label class="flex-1 text-black">Hãy chọn người chơi vị trí này:</label> 
                            <select class="text-black rounded flex-2 border border-slate-800" style="width: 14rem; height: 40px" v-model="playerChoose">
                                <option v-for="player in playerStore.playerFree()" :id="player.id" :value="player.id">{{ player.name }}</option>
                            </select>
                        </div>
                        
                        <button class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-1/3" style="margin: auto; height: 35px;"
                            @click="choosePlayerRole">Chọn</button>
                    </div>
                    <div v-else>
                        Số lượng người chơi không đủ để giữ vai trò này, vui lòng <NuxtLink to="/setting/player"
                            class="text-red-500 underline">cài đặt</NuxtLink> thêm
                    </div>
                </div>
                <div v-if="setRoleMulti">
                    <div class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-white"
                        v-if="playerStore.playerFree().length > 0">
                        <div class="flex justify-center items-center mb-3 ">
                            <label class="flex-1 text-black">Hãy chọn người chơi vị trí này:</label> 
                            <select class="text-black rounded flex-2 border border-slate-800" style="width: 14rem; min-height: 40px" v-model="playerChooseMulti" multiple>
                                <option v-for="player in playerStore.playerFree()" :id="player.id" :value="player.id">{{ player.name }}</option>
                            </select>
                            
                        </div>
                        <button class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-1/3" style="margin: auto; height: 35px;"
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
                    <div class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-white">
                        <div class="flex justify-center items-center mb-3 ">
                            <label class="flex-1 text-black">Đêm nay bảo vệ muốn bảo vệ ai:</label>
                            <select class="text-black rounded flex-2 border border-slate-800" style="width: 14rem; height: 40px" v-model="playerProtectChoose">
                                    <option v-for="player in playerStore.playerArr" :id="player.id" :value="player.id">{{ player.name }}</option>
                                </select>
                        </div>
                        <button class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-1/3" style="margin: auto; height: 35px;"
                            @click="choosePlayerProtect">Chọn</button>
                    </div>
                </div>
                <!-- Set Wolf Action -->
                <div v-if="setKill">
                    <div class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-white">
                        <div class="flex justify-center items-center mb-3 ">
                            <label class="flex-1 text-black">Đêm nay sói muốn cắn ai:</label>
                            <select class="text-black rounded flex-2 border border-slate-800" style="width: 14rem; height: 40px" v-model="playerKillChoose">
                                <option v-for="player in playerStore.playerAlive()" :id="player.id" :value="player.id">{{ player.name }}</option>
                            </select>
                        </div>
                        <button class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-1/3" style="margin: auto; height: 35px;"
                            @click="choosePlayerKill">Chọn</button>
                    </div>
                </div>
                <!-- Set Lookup -->
                <div v-if="setLookup">
                    <div class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-white">
                        <div class="flex justify-center items-center mb-3 ">
                            <label class="flex-1 text-black">Đêm nay tiên tri muốn soi ai:</label>    
                            <select class="text-black rounded flex-2 border border-slate-800" style="width: 14rem; height: 40px" v-model="playerLookupChoose">
                                <option v-for="player in playerStore.playerArr" :id="player.id" :value="player.id">{{ player.name }}</option>
                            </select>
                        </div>
                        
                        <button class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-1/3" style="margin: auto; height: 35px;"
                            @click="choosePlayerLookup">Chọn</button>
                    </div>
                </div>
                <!-- Set Witch Action -->
                <div v-if="setWitchHelp">
                    <div v-if="playerStore.witchHasHelp" class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-white mb-4">
                        <div class="flex justify-center items-center mb-3 ">
                            <label class="flex-1 text-black">Đêm nay Phù Thủy muốn ném bình cứu ai:</label>
                            <select class="text-black rounded flex-2 border border-slate-800" style="width: 14rem; height: 40px" v-model="witchHelpChoose">
                                <option v-for="player in playerStore.playerDead()" :id="player.id" :value="player.id">{{ player.name }}</option>
                            </select>
                        </div>
                        
                        <button class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-1/3" style="margin: auto; height: 35px;"
                            @click="choosePlayerWitchHelp">Chọn</button>
                    </div>
                    <div v-else class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-white">
                        Phù thủy đã ném hết bình thuốc cứu!
                    </div>
                </div>
                <div v-if="setWitchKill">
                    <div v-if="playerStore.witchHasKill" class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-white">
                        <div class="flex justify-center items-center mb-3 ">
                            <label class="flex-1 text-black">Đêm nay Phù Thủy muốn ném bình giết ai:</label>
                            <select class="text-black rounded flex-2 border border-slate-800" style="width: 14rem; height: 40px" v-model="witchKillChoose">
                                <option v-for="player in playerStore.playerAlive()" :id="player.id" :value="player.id">{{ player.name }}</option>
                            </select>
                        </div>
                        
                        <button class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-1/3" style="margin: auto; height: 35px;"
                            @click="choosePlayerWitchKill">Chọn</button>
                    </div>
                    <div v-else class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-white">
                        Phù thủy đã ném hết bình thuốc độc!
                    </div>
                </div>
                <!-- Set Hunter Action -->
                <div v-if="setHunterAim">
                    <div class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-white">
                        <div class="flex justify-center items-center mb-3 ">
                            <label class="flex-1 text-black">Đêm nay Thợ Săn muốn ngắm bắn ai:</label>
                            <select class="text-black rounded flex-2 border border-slate-800" style="width: 14rem; height: 40px" v-model="playerAimChoose">
                                <option v-for="player in playerStore.playerAlive()" :id="player.id" :value="player.id">{{ player.name }}</option>
                            </select>
                        </div>
                        
                        <button class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-1/3" style="margin: auto; height: 35px;"
                            @click="choosePlayerHunterAim">Chọn</button>
                    </div>
                </div>
            </div>
            <button
                class="bg-green-500 rounded p-2 w-1/2 text-md mx-auto  text-center border-white border-2 uppercase font-bold hover:bg-green-600 mt-6"
                @click="nextStep">
                Tiếp theo</button>
            <NuxtLink to="/play/night/every"
                class="bg-orange-500 rounded p-2 w-1/2 text-md mx-auto text-center border-orange-200 border-2 uppercase font-medium hover:bg-orange-800">
                Qua Đêm</NuxtLink>
        </div>
    </div>
</template>
<script setup>
import { usePlayerStore } from '@/stores/player';
const playerStore = usePlayerStore();

const gameScript = ref('');
const modScript = ref('');
const setRole = ref(false);
const setRoleMulti = ref(false);
const setProtect = ref(false);
const setLookup = ref(false);
const setWitchHelp = ref(false);
const setWitchKill = ref(false);
const setKill = ref(false);
const setHunterAim = ref(false);
const roleChoose = ref(0);
const playerChoose = ref(0);
const playerKillChoose = ref(0);
const playerProtectChoose = ref(0);
const playerLookupChoose = ref(0);
const playerAimChoose = ref(0);
const witchHelpChoose = ref(0);
const witchKillChoose = ref(0);
const playerChooseMulti = ref([]);
const step = ref(0);
const listScript = [
    {
        id: 0,
        step: 0,
        text: 'Màn đêm tối tăm buông xuống nơi khu làng ven sông, từ xa có tiếng sói vọng lại.',
        modText: 'chia bài cho mọi người',
        delay: 3,
        actionAfter: []
    },
    {
        id: 1,
        step: 1,
        text: 'Đêm đầu tiên, tất cả dân làng đã chìm vào giấc ngủ sâu.',
        modText: 'ra lệnh cho mọi người đi ngủ',
        delay: 3,
        actionAfter: []
    },
    {
        id: 2,
        step: 2,
        text: 'Bảo vệ thức dậy',
        modText: 'gọi bảo vệ thức dậy',
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
    //add text
    const script = listScript.find(item => item.step == step.value);
    gameScript.value = script.text;
    modScript.value = script.modText;

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
            break;
        case 'werewolve':
            setProtect.value = false;
            setRoleMulti.value = true;
            roleChoose.value = 2;
            break;
        case 'fortune_teller':
            setKill.value = false;
            setRole.value = true;
            roleChoose.value = 6;
            break;
        case 'witch':
            setLookup.value = false;
            setRole.value = true;
            roleChoose.value = 4;
            break;
        case 'hunter':
            setWitchHelp.value = false;
            setWitchKill.value = false;
            setRole.value = true;
            roleChoose.value = 5;
            break;
        default:
            setRole.value = false;
            break;
    }
}

const choosePlayerRole = () => {
    let newText = playerStore.changeRole(playerChoose.value, roleChoose.value);
    modScript.value = newText;
    setRole.value = false;
    if(roleChoose.value ==  3) {
        setProtect.value = true;
    }
    if(roleChoose.value ==  6) {
        setLookup.value = true;
    }
    if(roleChoose.value ==  4) {
        setWitchHelp.value = true;
        setWitchKill.value = true;
    }
    if(roleChoose.value ==  5) {
        setHunterAim.value = true;
    }
}

const choosePlayerRoleMulti = () => {
    let newText = '';
    playerChooseMulti.value.forEach(item => {
        newText = playerStore.changeRole(item, roleChoose.value);
    });
    if(newText !== '') {
        setRoleMulti.value = false;
        modScript.value = newText;
        setKill.value = true;
    }
}

const choosePlayerProtect = () => {
    playerStore.setProtect(playerProtectChoose.value);
    nextStep();
}

const choosePlayerKill = () => {
    playerStore.setDead(playerKillChoose.value);
    nextStep();
}

const choosePlayerLookup = () => {
    gameScript.value += " " + playerStore.lookUpWolf(playerLookupChoose.value);
}

const choosePlayerWitchHelp = () => {
    //relive
    if(playerStore.witchHasHelp) {
        playerStore.setRelive(witchHelpChoose.value);
    } else {
        alert('Phù thủy đã hết bình thuốc giải');
        return;
    }
}

const choosePlayerWitchKill = () => {
    //kill
    if(playerStore.witchHasKill) {
        playerStore.setDead(witchKillChoose.value, 'witch');
    } else {
        alert('Phù thủy đã hết bình thuốc độc');
        return;
    }
}

const choosePlayerHunterAim = () => {
    playerStore.setAim(playerAimChoose.value);
    nextStep();
}
</script>