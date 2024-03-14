import { useGameStore } from "./game";
import { useNightStore } from "./night";
import { useRoleStore } from "./role";

export const usePlayerStore = defineStore('player', () => {
    const game = useGameStore();
    const night = useNightStore();
    const role = useRoleStore();
    
    const player = ref([
        {
            id: 1,
            name: 'Hoàng Trang',
            roleID: 1,
            alive: true,
        }
    ])

    function $reset() {
        player.value = [{
            id: 1,
            name: 'Hoàng Trang',
            roleID: 1,
            alive: true,
        }];
    }

    const resetRole = () => {
        player.value.forEach(item => {
            item.roleID = 1;
        })
    }

    const checkNameExist = (name) => {
        return player.value.some(item => item.name.toUpperCase() == name.toUpperCase());
    }

    const add = (name) => {
        if (checkNameExist(name)) {
            alert('Đã có người chơi dùng tên này!');
            return;
        }
        let lastId = 0; // Khởi tạo lastId với giá trị mặc định
        if (player.value.length > 0) {
            lastId = player.value[player.value.length - 1].id;
        }
        const newPlayer = {
            id: lastId + 1,
            name: name,
            roleID: 1,
            alive: true,
        }
        player.value.push(newPlayer);
        game.setTotalPlayer(player.value.length);
    }

    const remove = (id) => {
        player.value = player.value.filter(item => item.id != id);
        game.setTotalPlayer(player.value.length);
    }

    const getPlayerFree = () => {
        return player.value.filter(item => item.roleID == 1);
    }

    const getPlayerAlive = () => {
        return player.value.filter(item => item.alive == true);
    }

    const getPlayerByID = (id) => {
        return player.value.find(item => item.id == id);
    }

    const getPlayerRoleHunter = () => {
        return player.value.find(item => item.roleID == 5);
    }

    const setRole = (idPlayer, idRole) => {
        const findRole = player.value.filter(item => item.roleID === idRole);
        if (findRole.length > 0 && ![1, 2].includes(idRole)) {
            alert('Đã có người chơi nắm giữ Role này!');
            return;
        }
        player.value.forEach(item => {
            if (item.id === idPlayer) {
                item.roleID = idRole;
            }
        });
    }

    const isWolf = (idPlayer) => {
        const playerFind = player.value.find(item => item.id == idPlayer);
        if(playerFind.roleID == 2) {
            alert(`${playerFind.name} chính là sói!`);
            return true;
        } else {
            alert(`${playerFind.name} không phải là sói!`);
            return false;
        }
    }

    const setDead = (idPlayer, type = 'wolf') => {
        let result = false;
        player.value.forEach(item => {
            if(item.id == idPlayer){
                if(item.alive == false) {
                    alert('Người này đã chết từ trước!')
                } else {
                    switch (type) {
                        case 'wolf':
                            if(night.protectID == idPlayer) {
                                alert('Sói cắn trúng người được bảo vệ!');
                                result = false;
                            } else if(item.roleID == 5) { //cắn trúng thợ săn
                                alert('Sói cắn trúng thợ săn');
                                item.alive = false;
                                setDead(night.aimID, 'hunter');
                                result = true;
                            } else {
                                alert(`${item.name} đã bị sói cắn chết`);
                                item.alive = false;
                                result = true;
                            }
                            break;
                        case 'witch':
                            if(role.witchHasPoison) {
                                role.witchUsingPoison();
                                item.alive = false;
                                result = true;
                            } else {
                                alert('Phù thủy không còn bình thuốc độc!')
                                result = false;
                            }
                            break;
                        case 'hunter':
                            alert(`${item.name} đã bị thợ săn bắn chết`);
                            item.alive = false;
                            result = true;
                        default:
                            break;
                    }
                }
            }
        })
        return result;
    }

    const revival = (idPlayer) => {
        if (role.witchHasProtect) {
            player.value.forEach(item => {
                if (item.id == idPlayer) {
                    if (night.protectID == idPlayer) {
                        alert('Người này đã được bảo vệ, không cần cứu');
                        return false;
                    } else {
                        role.witchUsingProtect();
                        night.removePlayerKilledByWolf(idPlayer);
                        item.alive = true;
                        return true;
                    }
                }
            });
        } else {
            alert('Phù thủy đã hết thuốc hồi sinh!');
            return false;
        }
    }

    return {
        $reset,
        player,
        resetRole,
        remove,
        add,
        getPlayerFree,
        getPlayerAlive,
        getPlayerByID,
        setRole,
        setDead,
        isWolf,
        revival,
        getPlayerRoleHunter
    }
}, {persist: true})