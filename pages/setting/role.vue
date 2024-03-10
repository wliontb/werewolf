<template>
    <div class="flex flex-col w-full gap-4">
        <div class="flex flex-col gap-4">
            <div class="w-full text-yellow-500">
                <h1 class="font-bold">Chọn vai trò xuất hiện trong Ván Đấu:</h1>
            </div>
            <div class="flex flex-wrap">
                <div class="p-1 w-1/2" v-for="role in roleStore.roleArr" :id="role.id">
                    <div class="flex border border-white rounded p-3 bg-green-600 hover:bg-green-400">
                        <div class="w-2/3">{{ role.name }}</div>
                        <input type="checkbox" class="rounded w-1/3" :checked="role.active" @change="roleStore.changeUsingRole(role.id)" :disabled="role.id == 1 || role.id == 2">
                    </div>
                </div>
            </div>
            <div class="flex">
                <NuxtLink to="/setting/player" class="bg-orange-500 rounded p-2 w-1/2 text-md mx-auto  text-center border-white border-2 uppercase font-bold hover:bg-red-500">Tiếp tục</NuxtLink>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { useRoleStore } from '@/stores/role';
    const roleStore = useRoleStore();
</script>