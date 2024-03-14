export const usePlayer2Store = defineStore('player2', () => {
    const player = ref([
        {
            id: 1,
            name: 'Hoàng Trang',
            roleID: 1,
            alive: true,
        }
    ])

    return {
        player
    }
})