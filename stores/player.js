export const usePlayerStore = defineStore('player', () => {
    const playerArr = ref([]);
    const witchHasHelp = ref(true);
    const witchHasKill = ref(true);

    const deactiveWitch = (spell) => {
        if (witchHasHelp.value == false && witchHasKill.value == false) {
            alert('Phù thủy đã không còn bình thuốc nào!');
            return;
        }
        if (spell == 'help') {
            witchHasHelp.value = false;
        }
        if (spell == 'kill') {
            witchHasKill.value = false;
        }
    }

    const checkNameExist = (name) => {
        return playerArr.value.some(item => item.name.toUpperCase() == name.toUpperCase());
    }

    const totalPlayer = () => playerArr.value.length;

    const playerFree = () => {
        return playerArr.value.filter(item => item.role == 1);
    }

    const playerAlive = () => {
        return playerArr.value.filter(item => item.alive == true);
    }

    const playerDead = () => {
        return playerArr.value.filter(item => item.alive == false);
    }

    const addPlayer = (name) => {
        if (checkNameExist(name)) {
            alert('Trùng tên người chơi');
            return;
        }
        let lastId = 0; // Khởi tạo lastId với giá trị mặc định
        if (playerArr.value.length > 0) {
            lastId = playerArr.value[playerArr.value.length - 1].id;
        }
        const newPlayer = {
            id: lastId + 1,
            name: name,
            role: 1,
            alive: true,
            protected: false,
            aim: false
        }
        playerArr.value.push(newPlayer);
    }

    const changeRole = (id, role) => {
        let textResult = '';
        const findRole = playerArr.value.filter(item => item.role === role);
        if (findRole.length > 0 && role !== 2) {
            alert('Đã có người nắm vai trò này')
            return;
        }
        playerArr.value.forEach(player => {
            if (player.id === id) {
                player.role = role;
                switch (role) {
                    case 3:
                        textResult = 'Bảo vệ muốn bảo vệ ai?';
                        break;
                    case 2:
                        textResult = 'Sói muốn cắn ai?';
                        break;
                    case 6:
                        textResult = 'Tiên tri muốn soi ai?';
                        break;
                    case 4:
                        textResult = 'Phù thủy muốn dùng bình thuốc nào?';
                        break;
                    case 5:
                        textResult = 'Thợ săn muốn ngắm bắn ai?';
                        break;
                    default:
                        break;
                }
                
            }
        });
        return textResult;
    }

    const removePlayer = (id) => {
        playerArr.value = playerArr.value.filter(user => user.id !== id);
    }

    const resetRole = () => {
        playerArr.value.forEach(item => {
            item.role = 1;
            item.alive = true;
            item.protected = false;
            item.aim = false;
        })
    }

    const setProtect = (id) => {
        playerArr.value.forEach(player => {
            if (player.id === id) {
                if (player.protected == true) {
                    alert('Người này đã được bảo vệ từ đêm trước');
                    return;
                } else {
                    player.protected = true;
                }
            }
        })
    }

    const setDead = (id, type = 'wolf') => {
        playerArr.value.forEach(player => {
            if (player.id === id) {
                if (player.alive == false) {
                    alert('Người này đã chết');
                    return;
                } else {
                    if (type == 'wolf') {
                        if (player.protected == true) {
                            alert('Sói cắn trúng người được bảo vệ!');
                            return;
                        } else {
                            player.alive = false;
                        }
                    } else if (type == 'witch') {
                        deactiveWitch('kill');
                        player.alive = false;
                    } else if (type == 'hunter') {
                        alert(`${player.name} đã bị thợ săn bắn chết`);
                        player.alive = false;
                    } else {
                        player.alive = false;
                    }

                }
            }
        })
    }

    const setRelive = (id) => {
        playerArr.value.forEach(player => {
            if (player.id === id) {
                if (player.protected == true) {
                    alert('Người này đã được bảo vệ');
                    return;
                } else {
                    deactiveWitch('help');
                    player.alive = true;
                }
            }
        })
    }

    const setAim = (id) => {
        playerArr.value.forEach(player => {
            if (player.id === id) {
                if (player.alive == false) {
                    alert('Người này đã chết');
                    return;
                } else {
                    player.aim = true;
                }
            }
        })
    }

    const lookUpWolf = (id) => {
        const playerLookup = playerArr.value.find(item => item.id == id);
        if(playerLookup.role == 2) {
            return `${playerLookup.name} chính là sói`;
        } else {
            return `${playerLookup.name} không phải là sói`;
        }
    }

    return { playerArr, witchHasHelp, witchHasKill, lookUpWolf, setRelive, deactiveWitch, addPlayer, changeRole, totalPlayer, removePlayer, playerFree, resetRole, setProtect, playerAlive, playerDead, setDead, setAim }
})