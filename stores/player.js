export const usePlayerStore = defineStore('player', () => {
    const playerArr = ref([]);

    const checkNameExist = (name) => {
        return playerArr.value.some(item => item.name.toUpperCase() == name.toUpperCase());
    }

    const totalPlayer = () => playerArr.value.length;

    const playerFree = () => {
        return playerArr.value.filter(item => item.role == 1);
    }

    const addPlayer = (name) => {
        if(checkNameExist(name)) {
            alert('Trùng tên người chơi');
            return;
        }
        let lastId = 0; // Khởi tạo lastId với giá trị mặc định
        if (playerArr.value.length > 0) {
            lastId = playerArr.value[playerArr.value.length - 1].id;
        }
        const newPlayer = {
            id: lastId+1,
            name: name,
            role: 1,
            alive: true,
            protected: false
        }
        playerArr.value.push(newPlayer);
    }

    const changeRole = (id, role) => {
        const findRole = playerArr.value.filter(item => item.role === role);
        if(findRole.length > 0 && role !== 2) {
            alert('Đã có người nắm vai trò này')
            return;
        }
        playerArr.value.forEach(player => {
            if(player.id === id)
                player.role = role;
        })
    }

    const removePlayer = (id) => {
        playerArr.value = playerArr.value.filter(user => user.id !== id);
    }

    const resetRole = () => {
        playerArr.value.forEach(item => {
            item.role = 1;
            item.alive = true;
            item.protected = false;
        })
    }

    const setProtect = (id) => {
        playerArr.value.forEach(player => {
            if(player.id === id) {
                if(player.protected == true) {
                    alert('Người này đã được bảo vệ từ đêm trước');
                    return;
                } else {
                    player.protected = true;
                }
            }
        })
    }

    return {playerArr, addPlayer, changeRole, totalPlayer, removePlayer, playerFree, resetRole, setProtect}
})