<template>
    <div class="py-3 px-2 rounded bg-gradient-to-r from-indigo-500 mb-2">
        <p class="font-semibold text-yellow-300 underline ">Nội dung ván đấu:</p>
        <p class="text-sm">{{ gameScript }}</p>
        <p class="font-semibold text-yellow-300 mt-2 underline ">Hành động Quản trò:</p>
        <p class="text-sm" v-if="modScript.startsWith('Q:')">
            <span class="text-red-500">Hỏi:</span>
            {{ modScript.slice(2) }}
        </p>
        <p class="text-sm" v-else-if="modScript.startsWith('T:')">
            <span class="text-red-500">Nói:</span>
            {{ modScript.slice(2) }}
        </p>
        <p class="text-sm" v-else>
            {{ modScript }}
        </p>
    </div>
</template>
<script setup>
    const props = defineProps(['gameScript', 'modScript'])
</script>