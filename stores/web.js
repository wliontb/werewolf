export const useWebStore = defineStore('web', () => {
    const displayMenu = ref(false);

    const toggleMenu = () => {
        displayMenu.value = !displayMenu.value;
    };

    return {
        displayMenu,
        toggleMenu
    }
})