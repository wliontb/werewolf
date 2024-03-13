<template>
    <div class="flex flex-col gap-4 w-4/5">
        <div class="flex flex-col gap-2">
            <div class="w-full text-red-500 font-bold uppercase text-2xl">Đêm trăng đầu tiên</div>
            <div class="flex-col">
                <div class="py-1 px-2 rounded bg-gradient-to-r from-indigo-500 mb-2">
                    <p class="font-semibold text-yellow-300 underline ">Nội dung ván đấu:</p>
                    <p class="text-sm">{{ gameScript }}</p>
                    <p class="font-semibold text-yellow-300 mt-2 underline ">Hành động Quản trò:</p>
                    <p class="text-sm">{{ modScript }}</p>
                </div>
                <!-- Pickrole -->
                <div v-if="setRole">
                    <div class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-slate-300"
                        v-if="playerStore.playerFree().length > 0">
                        <div class="flex justify-center items-center mb-3 ">
                            <label class="flex-1 text-black">Chọn 1 người chơi giữ Role này:</label> 
                            <select class="text-black rounded flex-2 border border-slate-800 bg-slate-200" style="width: 14rem; height: 40px" v-model="playerChoose">
                                <option v-for="player in playerStore.playerFree()" :id="player.id" :value="player.id">{{ player.name }}</option>
                            </select>
                        </div>
                        
                        <button class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-1/3 border-white border" style="margin: auto; height: 35px;"
                            @click="choosePlayerRole">Chọn</button>
                    </div>
                    <div v-else>
                        Số lượng người chơi không đủ để giữ vai trò này, vui lòng <NuxtLink to="/setting/player"
                            class="text-red-500 underline">cài đặt</NuxtLink> thêm
                    </div>
                </div>
                <!-- PickroleMulti -->
                <div v-if="setRoleMulti">
                    <div class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-white"
                        v-if="playerStore.playerFree().length > 0">
                        <div class="flex justify-center items-center mb-3 ">
                            <label class="flex-1 text-black">Chọn những người chơi giữ Role này:</label> 
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
                    <div class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-slate-300">
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
                            @click="choosePlayerKill">Cắn</button>
                        <button class="bg-red-600 rounded text-sm py-1 px-1.5 uppercase w-1/3" style="margin: auto; height: 35px;"
                            @click="nextStep">Không cắn ai</button>
                    </div>
                </div>
                <!-- Set Lookup -->
                <div v-if="setLookup">
                    <div class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-white">
                        <div class="flex justify-center items-center mb-3 ">
                            <label class="flex-1 text-black">Đêm nay tiên tri muốn soi ai:</label>    
                            <select class="text-black rounded flex-2 border border-slate-800" style="width: 14rem; height: 40px" v-model="playerLookupChoose">
                                <option v-for="player in playerStore.playerArr.filter(item => item.role !== 6)" :id="player.id" :value="player.id">{{ player.name }}</option>
                            </select>
                        </div>
                        
                        <button class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-1/3" style="margin: auto; height: 35px;"
                            @click="choosePlayerLookup">Chọn</button>
                    </div>
                </div>
                <!-- Set Witch Action -->
                <div v-if="setWitchHelp">
                    <div v-if="playerStore.witchHasHelp" class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-white mb-4">
                        <div class="flex justify-center items-center mb-3" v-if="nightStore.playerDeadArr.length > 0">
                            <label class="flex-1 text-black">Đêm nay Phù Thủy muốn ném bình cứu ai:</label>
                            <select class="text-black rounded flex-2 border border-slate-800" style="width: 14rem; height: 40px" v-model="witchHelpChoose">
                                <option v-for="playerID in nightStore.playerDeadArr" :value="playerID">{{ playerStore.playerWithID(playerID).name }}</option>
                            </select>
                        </div>
                        <div class="flex justify-center items-center mb-3 text-black" v-if="nightStore.playerDeadArr.length == 0">
                            Đêm nay chưa có ai chết phù thủy không cần cứu
                        </div>
                        <button class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-1/3" style="margin: auto; height: 35px;" v-if="nightStore.playerDeadArr.length == 0"
                            @click="nextStep()">OK</button>

                        <button class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-1/3" style="margin: auto; height: 35px;"
                            @click="choosePlayerWitchHelp" v-if="nightStore.playerDeadArr.length > 0">Cứu</button>
                        <button class="bg-red-600 rounded text-sm py-1 px-1.5 uppercase w-1/3" style="margin: auto; height: 35px;"
                            @click="nextStep" v-if="nightStore.playerDeadArr.length > 0">Không cứu</button>
                    </div>
                    <div v-else class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-white">
                        Phù thủy đã ném hết bình thuốc cứu!
                    </div>
                </div>
                <div v-if="setWitchKill">
                    <div v-if="playerStore.witchHasKill" class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-white">
                        <div class="flex justify-center items-center mb-3 ">
                            <label class="flex-1 text-black">Đêm nay Phù Thủy muốn hạ độc ai:</label>
                            <select class="text-black rounded flex-2 border border-slate-800" style="width: 14rem; height: 40px" v-model="witchKillChoose">
                                <option v-for="player in playerStore.playerAlive()" :id="player.id" :value="player.id">{{ player.name }}</option>
                            </select>
                        </div>
                        
                        <button class="bg-red-600 rounded text-sm py-1 px-1.5 uppercase w-1/3" style="margin: auto; height: 35px;"
                            @click="choosePlayerWitchKill">Ném</button>
                        <button class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-1/3" style="margin: auto; height: 35px;"
                            @click="choosePlayerWitchKill">Không ném</button>
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
                                <option v-for="player in playerStore.playerArr" :id="player.id" :value="player.id">{{ player.name }}</option>
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
            <NuxtLink v-if="step == listStep.length" to="/play/day/one"
                class="bg-orange-500 rounded p-2 w-1/2 text-md mx-auto text-center border-orange-200 border-2 uppercase font-medium hover:bg-orange-800">
                Qua Đêm</NuxtLink>
        </div>
    </div>
    <LogBar />
</template>
<script setup>
import { usePlayerStore } from '@/stores/player';
import { useNightStore } from '@/stores/night';
const playerStore = usePlayerStore();
const nightStore = useNightStore();

const step = ref(0);
const gameScript = ref('');
const modScript = ref('');

const setRole = ref(false);
const setRoleMulti = ref(false);

const setProtect = ref(false);
const setKill = ref(false);
const setLookup = ref(false);
const setWitchHelp = ref(false);
const setWitchKill = ref(false);
const setHunterAim = ref(false);

const roleChoose = ref(0);
const playerChoose = ref(0);
const playerChooseMulti = ref([]);

const playerProtectChoose = ref(0);
const playerKillChoose = ref(0);
const playerLookupChoose = ref(0);
const witchHelpChoose = ref(0);
const witchKillChoose = ref(0);
const playerAimChoose = ref(0);

const listStep = ref([
    {
        gameScript: 'Tất cả đi ngủ',
        modScript: 'Quản trò ra lệnh đi ngủ',
        action: []
    },
    {
        gameScript: 'Bảo vệ thức dậy',
        modScript: 'Gọi bảo vệ thức dậy',
        action: ['wakeupGuardian']
    },
    {
        gameScript: 'Bảo vệ muốn bảo vệ ai',
        modScript: 'Chọn người để bảo vệ',
        action: ['guardianProtect']
    },
    {
        gameScript: 'Sói thức dậy',
        modScript: 'Gọi sói dậy',
        action: ['wakeupWolf']
    },
    {
        gameScript: 'Sói muốn cắn ai',
        modScript: 'Ra lệnh cho sói cắn',
        action: ['wolfKill']
    },
    {
        gameScript: 'Tiên tri thức dậy',
        modScript: 'Gọi tiên tri thức giấc',
        action: ['wakeupFT']
    },
    {
        gameScript: 'Tiên tri soi người',
        modScript: 'Tiên tri soi đi',
        action: ['ftLookup']
    },
    {
        gameScript: 'Phù thủy tỉnh dậy',
        modScript: 'Gọi phù thủy dậy',
        action: ['wakeupWitch']
    },
    {
        gameScript: 'Phù thủy ném thuốc giải',
        modScript: 'Phù thủy ném thuốc giải',
        action: ['witchHelp']
    },
    {
        gameScript: 'Phù thủy ném thuốc độc',
        modScript: 'Phù thủy ném thuốc độc',
        action: ['witchKill']
    },
    {
        gameScript: 'Thợ săn tỉnh dậy',
        modScript: 'Gọi thợ săn tỉnh dậy',
        action: ['wakeupHunter']
    },
    {
        gameScript: 'Thợ săn ngắm bắn',
        modScript: 'Chọn người thợ săn muốn bắn',
        action: ['hunterAim']
    },
    {
        gameScript: 'Hết đêm',
        modScript: 'Qua đêm đầu tiên, chuẩn bị công bố kết quả',
        action: ['showLogNightOne']
    }
])

const nextStep = () => {
    if(step.value > (listStep.value.length - 1)){
        alert('Vui lòng qua đêm');
        return;
    }

    //add script
    const script = listStep.value[step.value];
    gameScript.value = script.gameScript;
    modScript.value = script.modScript;

    //trigger Action
    if (script.action.length > 0) {
        script.action.forEach(action => {
            triggerAction(action);
        })
    }
    //incre step
    step.value++;
}

const triggerAction = (actionName) => {
    switch (actionName) {
        case 'wakeupGuardian':
            setRole.value = true;
            roleChoose.value = 3;
            break;
        case 'guardianProtect':
            setRole.value = false;
            setProtect.value = true;
            break;
        case 'wakeupWolf':
            setProtect.value = false;
            setRoleMulti.value = true;
            roleChoose.value = 2;
            break;
        case 'wolfKill':
            setRoleMulti.value = false;
            setKill.value = true;
            break;
        case 'wakeupFT':
            setKill.value = false;
            setRole.value = true;
            roleChoose.value = 6;
            break;
        case 'ftLookup':
            setRole.value = false;
            setLookup.value = true;
            break;
        case 'wakeupWitch':
            setLookup.value = false;
            setRole.value = true;
            roleChoose.value = 4;
            break;
        case 'witchHelp':
            setRole.value = false;
            setWitchHelp.value = true;
            break;
        case 'witchKill':
            setWitchHelp.value = false;
            setWitchKill.value = true;
            break;
        case 'wakeupHunter':
            setWitchKill.value = false;
            setRole.value = true;
            roleChoose.value = 5;
            break;
        case 'hunterAim':
            setRole.value = false;
            setHunterAim.value = true;
            break;
        case 'showLogNightOne':
            setHunterAim.value = false;
            break;
        default:
            break;
    }
}

const choosePlayerRole = () => {
    playerStore.changeRole(playerChoose.value, roleChoose.value);
    nextStep();
}

const choosePlayerRoleMulti = () => {
    playerChooseMulti.value.forEach(item => {
        playerStore.changeRole(item, roleChoose.value);
    });
    nextStep();
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
    playerStore.lookUpWolf(playerLookupChoose.value);
    nextStep();
}

const choosePlayerWitchHelp = () => {
    //relive
    playerStore.setRelive(witchHelpChoose.value);
    nextStep();
}

const choosePlayerWitchKill = () => {
    //kill
    playerStore.setDead(witchKillChoose.value, 'witch');
    nextStep();
}

const choosePlayerHunterAim = () => {
    playerStore.setAim(playerAimChoose.value);
    nextStep();
}
</script>