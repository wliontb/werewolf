import { useNightStore } from "./night";

export const usePlayerStore = defineStore('player', () => {
    const night = useNightStore();
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

    const playerWithID = (id) => {
        return playerArr.value.find(player => player.id === id);
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
        const findRole = playerArr.value.filter(item => item.role === role);
        if (findRole.length > 0 && role !== 1) {
            alert('Đã có người nắm vai trò này')
            return;
        }
        playerArr.value.forEach(player => {
            if (player.id === id) {
                player.role = role;
            }
        });
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

        witchHasHelp.value = true;
        witchHasKill.value = true;
        night.playerDeadArr = [];
    }

    const setProtect = (id) => {
        playerArr.value.forEach(player => {
            if (player.id === id) {
                if (player.protected == true) {
                    alert('Người này đã được bảo vệ từ đêm trước');
                    return;
                } else {
                    player.protected = true;
                    night.changePlayerProtect(id);
                }
            }
        })
    }

    const setDead = (id, type = 'wolf') => {
        playerArr.value.forEach(player => {
            if (player.id === id) {
                if (player.alive == false) {
                    alert('Người này đã chết');
                } else {
                    if (type == 'wolf') {
                        console.log(night.playerProtectedID);
                        if (night.playerProtectedID == id) {
                            alert('Sói cắn trúng người được bảo vệ!');
                        } else {
                            player.alive = false;
                            night.addPlayerDead(id);
                        }
                    } else if (type == 'witch') {
                        if(witchHasKill.value) {
                            deactiveWitch('kill');
                            player.alive = false;
                            night.addPlayerDead(id);
                        } else {
                            alert('Phù thủy đã hết bình thuốc độc');
                        }
                    } else if (type == 'hunter') {
                        alert(`${player.name} đã bị thợ săn bắn chết`);
                        player.alive = false;
                        //xem thợ săn có bị bắn chết vào tối không?  night.addPlayerDead(id);
                    } else {
                        player.alive = false;
                    }

                }
            }
        })
    }

    const setRelive = (id) => {
        if(witchHasHelp.value) {
            playerArr.value.forEach(player => {
                if (player.id === id) {
                    if (night.playerProtectedID == id) {
                        alert('Người này đã được bảo vệ, không cần cứu');
                        return;
                    } else {
                        deactiveWitch('help');
                        night.removePlayerDead(id);
                        player.alive = true;
                    }
                }
            });
        } else {
            alert('Phù thủy đã hết bình thuốc giải');
        }
    }

    const setAim = (id) => {
        playerArr.value.forEach(player => {
            if (player.id === id) {
                player.aim = true;
                night.changePlayerAim(id);
            }
        })
    }

    const lookUpWolf = (id) => {
        const playerLookup = playerArr.value.find(item => item.id == id);
        if(playerLookup.role == 2) {
            alert(`${playerLookup.name} chính là sói`);
        } else {
            alert(`${playerLookup.name} không phải là sói`);
        }
    }

    return { playerWithID, playerArr, witchHasHelp, witchHasKill, lookUpWolf, setRelive, deactiveWitch, addPlayer, changeRole, totalPlayer, removePlayer, playerFree, resetRole, setProtect, playerAlive, playerDead, setDead, setAim }
}, {
    persist: true,
})