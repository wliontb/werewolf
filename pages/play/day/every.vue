<template>
    <div class="flex flex-col gap-4 w-4/5">
        <div class="flex flex-col gap-2">
            <div class="w-full text-red-500 font-bold uppercase text-2xl">Ngày thứ nhất</div>
            <div class="flex-col">
                <div class="py-1 px-2 rounded bg-gradient-to-r from-indigo-500 mb-2">
                    <p class="font-semibold text-yellow-300 underline ">Nội dung ván đấu:</p>
                    <p class="text-sm">{{ gameScript }}</p>
                    <p class="font-semibold text-yellow-300 mt-2 underline ">Hành động Quản trò:</p>
                    <p class="text-sm">{{ modScript }}</p>
                </div>
                <!-- Result -->
                <div v-if="displayResult">
                    <div class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-white">
                        <div class="flex-col justify-center items-center text-center mb-3">
                            <p class="text-black font-bold">Kết quả:</p>
                            <p class="text-black">
                                Đêm qua có {{ nightStore.killedByWolf.length + nightStore.killedByHunt.length + nightStore.killedByWitch.length }} người chết
                            </p>
                            <p class="text-black">
                                Kết luận: {{ gameStore.totalWolfLive == 0 ? 'Dân làng thắng' : gameStore.totalWolfLive == (gameStore.totalAlive/2) ? 'Sói đã thắng' : 'Game đấu vẫn tiếp tục' }}
                            </p>
                        </div>

                        <button class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-1/3"
                            style="margin: auto; height: 35px;" @click="nextStep">Tiếp tục</button>
                    </div>
                </div>
                <!-- Countdown -->
                <div v-if="displayCountdown">
                    <div class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-white">
                        <div class="mb-3 text-center">
                            <label class=" text-black">Đếm ngược thời gian tranh luận</label>
                        </div>
                        <div class="mb-3 text-center text-red-500">
                            {{ countdown }}
                        </div>
                        <button class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-1/3"
                            style="margin: auto; height: 35px;" @click="startCountdown" v-if="!counting">
                            Đếm ngược
                        </button>
                        <button class="bg-red-600 rounded text-sm py-1 px-1.5 uppercase w-1/3"
                            style="margin: auto; height: 35px;" @click="nextStep" v-if="counting">
                            Bỏ qua đếm ngược
                        </button>
                    </div>
                </div>
                <!-- Vote Dead -->
                <div v-if="displayLynch">
                    <div class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-2/3 mx-auto bg-white">
                        <div class="flex justify-center items-center mb-3 ">
                            <label class="flex-1 text-black">Chọn 1 người bước lên giàn treo:</label>
                            <select class="text-black rounded flex-2 border border-slate-800"
                                style="width: 14rem; height: 40px" v-model="playerLynchChoose">
                                <option v-for="player in playerStore.getPlayerAlive()" :id="player.id" :value="player.id">
                                    {{ player.name }}</option>
                            </select>
                        </div>

                        <button class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-1/3"
                            style="margin: auto; height: 35px;" @click="choosePlayerLynch">Chọn</button>
                    </div>
                </div>
            </div>
            <button
                class="bg-green-500 rounded p-2 w-1/2 text-md mx-auto  text-center border-white border-2 uppercase font-bold hover:bg-green-600 mt-6"
                @click="nextStep">
                Tiếp theo</button>
            <NuxtLink v-if="step == listStep.length" to="/play/night/every"
                class="bg-orange-500 rounded p-2 w-1/2 text-md mx-auto text-center border-orange-200 border-2 uppercase font-medium hover:bg-orange-800">
                Tới Đêm</NuxtLink>
        </div>
    </div>
    <LogBar />
</template>
<script setup>
import { usePlayerStore } from '@/stores/player';
import { useNightStore } from '@/stores/night';
import { useGameStore } from '@/stores/game';

const playerStore = usePlayerStore();
const nightStore = useNightStore();
const gameStore = useGameStore();

const step = ref(0);
const gameScript = ref('Bình minh ló rạng');
const modScript = ref('Ra lệnh cho mọi người mở mắt');

const displayResult = ref(false);
const displayLynch = ref(false);
const displayCountdown = ref(false);
const playerLynchChoose = ref(0);

const countdown = ref('05:00');
const counting = ref(false);
let timer = null;

const listStep = ref([
    {
        gameScript: 'Án mạng kinh hoàng',
        modScript: `Thông báo cho mọi người biết đêm qua ai bị chết`,
        action: ['showResult']
    },
    {
        gameScript: 'Sự chia rẽ',
        modScript: 'Cho mọi người 5 phút thảo luận',
        action: ['discuss']
    },
    {
        gameScript: 'Dân làng phẫn nộ',
        modScript: 'Chọn 1 người nhiều phiếu bầu nhất lên dàn treo',
        action: ['chooseLynch']
    },
    {
        gameScript: 'Đêm đen kéo tới',
        modScript: 'Ra lệnh cho mọi người nhắm mắt',
        action: ['showLogDayOne']
    }
])

const nextStep = () => {
    if (step.value > (listStep.value.length - 1)) {
        alert('Vui lòng tới đêm');
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
        case 'showResult':
            displayResult.value = true;
            break;
        case 'discuss':
            displayResult.value = false;
            displayCountdown.value = true;
            break;
        case 'chooseLynch':
            displayCountdown.value = false;
            displayLynch.value = true;
            break;
        case 'showLogDayOne':
            displayLynch.value = false;
            break;
        default:
            break;
    }
}

const choosePlayerLynch = () => {
    playerStore.setDead(playerLynchChoose.value, 'lynch');
    nextStep();
}

const startCountdown = () => {
    counting.value = true;
    const startTime = Date.now();
    const endTime = startTime + 5 * 60 * 1000; // 5 minutes in milliseconds

    timer = setInterval(() => {
        const currentTime = Date.now();
        const remainingTime = endTime - currentTime;

        if (remainingTime <= 0) {
            clearInterval(timer);
            counting.value = false;
            countdown.value = '00:00';
            return;
        }

        const minutes = Math.floor(remainingTime / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        countdown.value = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
};

onBeforeUnmount(() => {
    clearInterval(timer);
});
</script>