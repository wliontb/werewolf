<template>
    <div class="flex flex-col gap-4 w-4/5">
        <div class="flex flex-col gap-2">
            <div class="w-full text-red-500 font-bold uppercase text-2xl">Đêm trăng thứ {{ nightStore.nightNumber }}</div>
            <div class="flex-col">
                <div class="py-1 px-2 rounded bg-gradient-to-r from-indigo-500 mb-2">
                    <p class="font-semibold text-yellow-300 underline ">Nội dung ván đấu:</p>
                    <p class="text-sm">{{ gameScript }}</p>
                    <p class="font-semibold text-yellow-300 mt-2 underline ">Hành động Quản trò:</p>
                    <p class="text-sm">{{ modScript }}</p>
                </div>
                <!-- End Pickrole -->
                <!-- Set Protected -->
                <div v-if="setProtect">
                    <div class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-slate-300" v-if="playerStore.player.filter(item => item.roleID == 3 && item.alive == true).length > 0">
                        <div class="flex justify-center items-center mb-3 ">
                            <label class="flex-1 text-black">Chọn người muốn bảo vệ khỏi sói:</label>
                            <select class="text-black rounded flex-2 border border-slate-800"
                                style="width: 14rem; height: 40px" v-model="playerProtectChoose">
                                <option v-for="player in playerStore.player" :id="player.id" :value="player.id">{{
                        player.name }}</option>
                            </select>
                        </div>
                        <button class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-1/3 mx-auto"
                            @click="choosePlayerProtect">Chọn</button>
                        <button class="bg-red-600 rounded text-sm py-1 px-1.5 uppercase w-1/3 mx-auto"
                            @click="nextStep">Không bảo vệ ai</button>
                    </div>
                    <div v-else class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-slate-300">
                        <div class="flex justify-center items-center mb-3 text-black">
                            Bảo vệ đã chết
                        </div>
                        <button class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-1/3 mx-auto"
                            @click="nextStep">Bỏ qua</button>
                    </div>
                </div>
                <!-- Set Wolf Action -->
                <div v-if="setKill">
                    <div class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-white">
                        <div class="flex justify-center items-center mb-3 ">
                            <label class="flex-1 text-black">Chọn người sói muốn ăn thịt:</label>
                            <select class="text-black rounded flex-2 border border-slate-800"
                                style="width: 14rem; height: 40px" v-model="playerKillChoose">
                                <option v-for="player in playerStore.getPlayerAlive()" :id="player.id"
                                    :value="player.id">{{ player.name }}</option>
                            </select>
                        </div>
                        <button class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-1/3 mx-auto"
                            @click="choosePlayerKill">Đánh chén</button>
                        <button class="bg-red-600 rounded text-sm py-1 px-1.5 uppercase w-1/3 mx-auto"
                            @click="nextStep">Tối nay ăn chay</button>
                    </div>
                </div>
                <!-- Set Lookup -->
                <div v-if="setLookup">
                    <div class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-white" v-if="playerStore.player.filter(item => item.roleID == 6 && item.alive == true).length > 0">
                        <div class="flex justify-center items-center mb-3 ">
                            <label class="flex-1 text-black">Đêm nay tiên tri muốn soi ai:</label>
                            <select class="text-black rounded flex-2 border border-slate-800"
                                style="width: 14rem; height: 40px" v-model="playerLookupChoose">
                                <option v-for="player in playerStore.player.filter(item => item.roleID !== 6)"
                                    :id="player.id" :value="player.id">{{ player.name }}</option>
                            </select>
                        </div>

                        <button class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-1/3 mx-auto"
                            @click="choosePlayerLookup">Chọn</button>
                    </div>
                    <div v-else class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-slate-300">
                        <div class="flex justify-center items-center mb-3 text-black">
                            Tiên tri đã chết
                        </div>
                        <button class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-1/3 mx-auto"
                            @click="nextStep">Bỏ qua</button>
                    </div>
                </div>
                <!-- Set Witch Action -->
                    <div v-if="setWitchHelp">
                        <div v-if="roleStore.witchHasProtect && playerStore.player.filter(item => item.roleID == 4 && item.alive == true).length > 0"
                            class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-green-200 mb-4">
                            <div class="flex justify-center items-center mb-3" v-if="nightStore.killedByWolf.length > 0">
                                <label class="flex-1 text-black">Chọn người để dùng Thuốc Hồi sinh:</label>
                                <select class="text-black rounded flex-2 border border-slate-800"
                                    style="width: 14rem; height: 40px" v-model="witchHelpChoose">
                                    <option v-for="playerID in nightStore.killedByWolf" :value="playerID">{{
                            playerStore.getPlayerByID(playerID).name }}</option>
                                </select>
                            </div>
                            <div class="flex justify-center items-center mb-3 text-black"
                                v-if="nightStore.killedByWolf.length == 0">
                                Đêm nay không có ai phải cứu!
                            </div>
                            <button class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-1/3 mx-auto"
                                v-if="nightStore.killedByWolf.length == 0" @click="nextStep()">OK luôn!</button>

                            <button class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-1/3 mx-auto"
                                @click="choosePlayerWitchHelp" v-if="nightStore.killedByWolf.length > 0">Cứu</button>
                            <button class="bg-red-600 rounded text-sm py-1 px-1.5 uppercase w-1/3 mx-auto" @click="nextStep"
                                v-if="nightStore.killedByWolf.length > 0">Không cứu</button>
                        </div>
                        <div v-else class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-white text-black">
                            Phù thủy không thể hồi sinh do hết thuộc hoặc đã ngỏm!
                            <button class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-1/3 mx-auto"
                                @click="nextStep">Bỏ qua</button>
                        </div>
                    </div>
                    <div v-if="setWitchKill">
                        <div v-if="roleStore.witchHasPoison && playerStore.player.filter(item => item.roleID == 4 && item.alive == true).length > 0"
                            class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-red-200">
                            <div class="flex justify-center items-center mb-3 ">
                                <label class="flex-1 text-black">Đêm nay Phù Thủy muốn hạ độc ai:</label>
                                <select class="text-black rounded flex-2 border border-slate-800"
                                    style="width: 14rem; height: 40px" v-model="witchKillChoose">
                                    <option v-for="player in playerStore.getPlayerAlive()" :id="player.id"
                                        :value="player.id">{{ player.name }}</option>
                                </select>
                            </div>

                            <button class="bg-red-600 rounded text-sm py-1 px-1.5 uppercase w-1/3 mx-auto"
                                @click="choosePlayerWitchKill">Hạ độc</button>
                            <button class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-1/3 mx-auto"
                                @click="nextStep">Bỏ qua</button>
                        </div>
                        <div v-else class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-white text-black">
                            Phù thủy không thể hạ độc do hết thuộc hoặc đã ngỏm!
                            <button class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-1/3 mx-auto"
                                @click="nextStep">Bỏ qua</button>
                        </div>
                    </div>
                
                <!-- Set Hunter Action -->
                <div v-if="setHunterAim">
                    <div class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-white" v-if="playerStore.player.filter(item => item.roleID == 5 && item.alive == true).length > 0">
                        <div class="flex justify-center items-center mb-3 ">
                            <label class="flex-1 text-black">Đêm nay Thợ Săn muốn ngắm bắn ai:</label>
                            <select class="text-black rounded flex-2 border border-slate-800"
                                style="width: 14rem; height: 40px" v-model="playerAimChoose">
                                <option v-for="player in playerStore.player" :id="player.id" :value="player.id">{{
                        player.name }}</option>
                            </select>
                        </div>

                        <button class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-1/3 mx-auto"
                            @click="choosePlayerHunterAim">Ngắm bắn</button>
                        <button class="bg-orange-600 rounded text-sm py-1 px-1.5 uppercase w-1/3 mx-auto"
                            @click="choosePlayerHunterAim">Không ngắm</button>
                    </div>
                    <div v-else class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-slate-300">
                        <div class="flex justify-center items-center mb-3 text-black">
                            Thợ săn đã chết
                        </div>
                        <button class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-1/3 mx-auto"
                            @click="nextStep">Bỏ qua</button>
                    </div>
                </div>
            </div>
            <button
                class="bg-green-500 rounded p-2 w-1/2 text-md mx-auto  text-center border-white border-2 uppercase font-bold hover:bg-green-600 mt-6"
                @click="nextStep">
                Tiếp theo</button>
            <NuxtLink v-if="step == listStep.length" to="/play/day/every"
                class="bg-orange-500 rounded p-2 w-1/2 text-md mx-auto text-center border-orange-200 border-2 uppercase font-medium hover:bg-orange-800">
                Qua Đêm</NuxtLink>
        </div>
    </div>
    <LogBar />
</template>
<script setup>
import { usePlayerStore } from '@/stores/player';
import { useNightStore } from '@/stores/night';
import { useRoleStore } from '@/stores/role';
import { useGameStore } from '@/stores/game';

const playerStore = usePlayerStore();
const nightStore = useNightStore();
const roleStore = useRoleStore();
const gameStore = useGameStore();

definePageMeta({
    middleware: [
        'validatenight'
    ]
})

const step = ref(0);
const gameScript = ref('Tất cả đi ngủ');
const modScript = ref('Quản trò ra lệnh cho mọi người đi ngủ');

const setProtect = ref(false);
const setKill = ref(false);
const setLookup = ref(false);
const setWitchHelp = ref(false);
const setWitchKill = ref(false);
const setHunterAim = ref(false);

const playerProtectChoose = ref(0);
const playerKillChoose = ref(0);
const playerLookupChoose = ref(0);
const witchHelpChoose = ref(0);
const witchKillChoose = ref(0);
const playerAimChoose = ref(0);

const listStep = ref([
    {
        gameScript: 'Bảo vệ muốn bảo vệ ai',
        modScript: 'Chọn người để bảo vệ',
        action: ['guardianProtect']
    },
    {
        gameScript: 'Sói muốn cắn ai',
        modScript: 'Ra lệnh cho sói cắn',
        action: ['wolfKill']
    },
    {
        gameScript: 'Tiên tri soi người',
        modScript: 'Tiên tri soi đi',
        action: ['ftLookup']
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
        gameScript: 'Thợ săn ngắm bắn',
        modScript: 'Chọn người thợ săn muốn bắn',
        action: ['hunterAim']
    },
    {
        gameScript: 'Hết đêm',
        modScript: 'Qua đêm, chuẩn bị công bố kết quả',
        action: ['showLogNightOne']
    }
])

const nextStep = () => {
    if (step.value > (listStep.value.length - 1)) {
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
        case 'guardianProtect':
            setProtect.value = true;
            break;
        case 'wolfKill':
            setProtect.value = false;
            setKill.value = true;
            break;
        case 'ftLookup':
            setKill.value = false;
            setLookup.value = true;
            break;
        case 'witchHelp':
            setLookup.value = false;
            setWitchHelp.value = true;
            break;
        case 'witchKill':
            setWitchHelp.value = false;
            setWitchKill.value = true;
            break;
        case 'hunterAim':
            setWitchKill.value = false;
            setHunterAim.value = true;
            break;
        case 'showLogNightOne':
            setHunterAim.value = false;
            break;
        default:
            break;
    }
}

const choosePlayerProtect = () => {
    if(nightStore.setProtectID(playerProtectChoose.value))
        nextStep();
    else
        alert('Vui lòng chọn lại');
}

const choosePlayerKill = () => {
    nightStore.addPlayerKilledByWolf(playerKillChoose.value);
    nextStep();
}

const choosePlayerLookup = () => {
    playerStore.isWolf(playerLookupChoose.value);
    nextStep();
}

const choosePlayerWitchHelp = () => {
    //relive
    playerStore.revival(witchHelpChoose.value);
    nextStep();
}

const choosePlayerWitchKill = () => {
    //kill
    nightStore.addPlayerKilledByWitch(witchKillChoose.value);
    nextStep();
}

const choosePlayerHunterAim = () => {
    nightStore.setAimID(playerAimChoose.value);
    nextStep();
}
</script>~/stores/player