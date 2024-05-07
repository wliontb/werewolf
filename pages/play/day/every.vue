<template>
    <div class="flex flex-col gap-4 w-full mb-4 md:w-4/5">
        <div class="flex flex-col gap-2">
            <div class="w-full text-red-500 font-bold uppercase text-2xl">🌞 Buổi sáng {{ nightStore.nightNumber == 1 ? 'đầu tiên' : `thứ ${nightStore.nightNumber}` }}</div>
            <div class="flex-col">
                <div class="py-3 px-2 rounded bg-gradient-to-r from-indigo-500 mb-2">
                    <p class="font-semibold text-yellow-300 underline ">Nội dung ván đấu:</p>
                    <p class="text-sm">{{ gameScript }}</p>
                    <p class="font-semibold text-yellow-300 mt-2 underline ">Hành động Quản trò:</p>
                    <p class="text-sm">{{ modScript }}</p>
                </div>
                <!-- Result -->
                <div v-if="displayResult">
                    <div class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-full md:w-2/3 mx-auto bg-white">
                        <div class="flex-col justify-center items-center text-center mb-3">
                            <p class="text-black">
                                <b>Kết quả:</b>  Đêm qua đã có {{ nightStore.killedByWolf.length + nightStore.killedByHunt.length + nightStore.killedByWitch.length }} người chết!
                            </p>
                            <p class="text-black">
                                <b class="text-red-500">Kết luận:</b> {{ gameStore.totalWolfLive == 0 ? 'Dân làng thắng' : gameStore.totalWolfLive >= (playerStore.getVillageAlive().length) ? 'Sói đã thắng' : 'Game đấu vẫn tiếp tục' }}
                            </p>
                        </div>

                        <button v-if="!(gameStore.totalWolfLive == 0 || gameStore.totalWolfLive >= (playerStore.getVillageAlive().length))" class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-40 h-9 mx-auto hover:bg-green-800" @click="nextStep">Tiếp tục</button>
                        <div class="flex flex-col gap-1" v-else>
                            <NuxtLink to="/setting/player" class="bg-green-500 rounded text-sm py-2 px-1.5 uppercase w-40 mx-auto hover:bg-green-700 text-center">Ván đấu mới</NuxtLink>
                            <NuxtLink to="/play/log" class="bg-orange-500 rounded text-sm py-2 px-1.5 uppercase w-40 mx-auto hover:bg-orange-700 text-center">Xem lại log ván đấu</NuxtLink>
                        </div>
                    </div>
                </div>
                <!-- Countdown -->
                <div v-if="displayCountdown">
                    <div class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-full md:w-2/3 mx-auto bg-white">
                        <div class="mb-3 text-center">
                            <label class=" text-black">Đếm ngược thời gian tranh luận</label>
                        </div>
                        <div class="mb-3 text-center text-red-500">
                            {{ countdown }}
                        </div>
                        <button class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-40 h-9 mx-auto hover:bg-green-800" @click="startCountdown" v-if="!counting">
                            Đếm ngược
                        </button>
                        <button class="bg-red-600 rounded text-sm py-1 px-1.5 uppercase w-40 h-9 mx-auto hover:bg-red-800" @click="nextStep">
                            Bỏ qua
                        </button>
                    </div>
                </div>
                <!-- Vote Lynch -->
                <div v-if="displayLynch">
                    <div class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-full md:w-2/3 mx-auto bg-white">
                        <div class="flex justify-center items-center mb-3 ">
                            <label class="flex-1 text-black min-w-60 p-3">Chọn 1 người bước lên giàn treo:</label>
                            <select class="text-black rounded flex-2 border border-slate-800"
                                style="width: 14rem; height: 40px" v-model="playerLynchChoose">
                                <option v-for="player in playerStore.getPlayerAlive()" :id="player.id" :value="player.id">
                                    {{ player.name }}</option>
                            </select>
                        </div>

                        <button class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-40 h-9 mx-auto hover:bg-green-800" @click="choosePlayerLynch">Chọn</button>
                        <button class="bg-red-600 rounded text-sm py-1 px-1.5 uppercase w-40 h-9 mx-auto hover:bg-red-800" @click="nextStep">Không treo cổ ai cả</button>
                    </div>
                </div>
                <!-- Display Log -->
                <div v-if="displayLogDay">
                    <div class="flex flex-col gap-1 border border-slate-600 p-2 rounded w-full md:w-2/3 mx-auto bg-white">
                        <div class="flex-col justify-center items-center text-center mb-3">
                            <p class="text-black">
                                <b class="text-red-500">Đã có chiến thắng chung cuộc:</b> {{ gameStore.totalWolfLive == 0 ? 'Dân làng thắng' : gameStore.totalWolfLive >= (playerStore.getVillageAlive().length) ? 'Sói đã thắng' : 'Game đấu vẫn tiếp tục' }}
                            </p>
                        </div>
                        <NuxtLink to="/setting/player" class="bg-green-600 rounded text-sm py-1 px-1.5 uppercase w-40 h-9 mx-auto hover:bg-green-800 text-center">Ván đấu mới</NuxtLink>
                        <NuxtLink to="/play/log" class="bg-orange-600 rounded text-sm py-1 px-1.5 uppercase w-40 h-9 mx-auto hover:bg-red-800 text-center">Xem lại log ván đấu</NuxtLink>
                    </div>
                </div>
            </div>
            <NuxtLink v-if="(step == listStep.length) && !(gameStore.totalWolfLive == 0 || gameStore.totalWolfLive >= (playerStore.getVillageAlive().length))" to="/play/night/every"
                class="bg-orange-500 rounded p-2 w-1/2 text-md mx-auto text-center border-orange-200 border-2 uppercase font-medium hover:bg-orange-800">
                Tới buổi tối
            </NuxtLink>
            <button v-if="(step != listStep.length && !displayLogDay)" class="bg-green-500 rounded p-2 w-1/2 text-md mx-auto  text-center border-white border-2 uppercase font-bold hover:bg-green-600 mt-6" @click="nextStep">
                Tiếp theo
            </button>
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
const gameScript = ref('Bình minh đã ló rạng');
const modScript = ref('Ra lệnh cho mọi người thức dậy');

const displayResult = ref(false);
const displayLogDay = ref(false);
const displayLynch = ref(false);
const displayCountdown = ref(false);
const playerLynchChoose = ref(0);

const countdown = ref('05:00');
const counting = ref(false);
let timer = null;

const listStep = ref([
    {
        gameScript: 'Kết quả sau một đêm ác mộng',
        modScript: 'Thông báo cho mọi người biết đêm qua ai bị chết',
        action: ['showResult']
    },
    {
        gameScript: 'Dân làng nghi ngờ lẫn nhau',
        modScript: 'Cho mọi người 5 phút thảo luận',
        action: ['discuss']
    },
    {
        gameScript: 'Dân làng phẫn nộ, họ quyết định sẽ có 1 người phải chịu tội',
        modScript: 'Chọn người có nhiều phiếu bầu nhất lên dàn treo',
        action: ['chooseLynch']
    },
    {
        gameScript: 'Màn đêm lại buông xuống cùng nỗi kinh hoàng',
        modScript: 'Ra lệnh cho mọi người nhắm mắt đi ngủ',
        action: ['showLogDay']
    }
])

const nextStep = () => {
    if(step.value == 0) {
        gameStore.addLogGame('Quản trò ra lệnh cho mọi người thức giấc');
    }

    if (step.value > (listStep.value.length - 1)) {
        alert('Vui lòng chọn tới đêm');
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
            gameStore.addLogGame(`Đêm qua đã có ${nightStore.killedByWolf.length + nightStore.killedByHunt.length + nightStore.killedByWitch.length} người chết!`);
            if(gameStore.totalWolfLive == 0 || gameStore.totalWolfLive >= (playerStore.getVillageAlive().length)){
                gameStore.addLogGame(`Game đấu đã kết thúc, phe ${gameStore.totalWolfLive == 0 ? 'Dân làng thắng' : gameStore.totalWolfLive >= (playerStore.getVillageAlive().length) ? 'Sói đã thắng' : ''}`);
                playerStore.pushPlayerOut(playerStore.getPlayerDead());
            } else {
                gameStore.addLogGame('Game đấu vẫn tiếp tục');
            }
            break;
        case 'discuss':
            displayResult.value = false;
            displayCountdown.value = true;
            break;
        case 'chooseLynch':
            displayCountdown.value = false;
            displayLynch.value = true;
            break;
        case 'showLogDay':
            displayLynch.value = false;
            if(gameStore.totalWolfLive == 0 || gameStore.totalWolfLive >= (playerStore.getVillageAlive().length)){
                displayLogDay.value = true;
                playerStore.pushPlayerOut(playerStore.getPlayerDead());
                gameStore.addLogGame(`Game đấu đã kết thúc, phe ${gameStore.totalWolfLive == 0 ? 'Dân làng thắng' : gameStore.totalWolfLive >= (playerStore.getVillageAlive().length) ? 'Sói đã thắng' : ''}`);
            } else {
                gameStore.addLogGame('Game đấu vẫn tiếp tục');
            }
            break;
        default:
            break;
    }
}

const choosePlayerLynch = () => {
    gameStore.addLogGame(`Mọi người quyết định sẽ treo cổ ${playerStore.getPlayerByID(playerLynchChoose.value).name}!`);
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