export const useWebStore = defineStore('web', () => {
    const displayMenu = ref(true);

    const toggleMenu = () => {
        displayMenu.value = !displayMenu.value;
    };

    return {
        displayMenu,
        toggleMenu
    }
})