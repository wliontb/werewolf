import { useGameStore } from "./game";
import { useNightStore } from "./night";
import { useRoleStore } from "./role";

export const usePlayerStore = defineStore('player', () => {
    const game = useGameStore();
    const night = useNightStore();
    const role = useRoleStore();

    const playerOut = ref([]);
    
    const player = ref([
        {
            id: 1,
            name: 'Tuấn Anh',
            roleID: 1,
            alive: true,
        },
        {
            id: 2,
            name: 'Hoàng Trang',
            roleID: 1,
            alive: true,
        },
        {
            id: 3,
            name: 'A Hải',
            roleID: 1,
            alive: true,
        },
        {
            id: 4,
            name: 'A Kul',
            roleID: 1,
            alive: true,
        },
        {
            id: 5,
            name: 'A Mút Tay',
            roleID: 1,
            alive: true,
        },
        {
            id: 6,
            name: 'Matcha',
            roleID: 1,
            alive: true,
        },
        {
            id: 7,
            name: 'LaLa',
            roleID: 1,
            alive: true,
        },
        {
            id: 8,
            name: 'C.Mai Anh',
            roleID: 1,
            alive: true,
        }
    ])

    function $reset() {
        player.value = [{
            id: 1,
            name: 'Tuấn Anh',
            roleID: 1,
            alive: true,
        },
        {
            id: 2,
            name: 'Hoàng Trang',
            roleID: 1,
            alive: true,
        },
        {
            id: 3,
            name: 'A Hải',
            roleID: 1,
            alive: true,
        },
        {
            id: 4,
            name: 'A Kul',
            roleID: 1,
            alive: true,
        },
        {
            id: 5,
            name: 'A Mút Tay',
            roleID: 1,
            alive: true,
        },
        {
            id: 6,
            name: 'Matcha',
            roleID: 1,
            alive: true,
        },
        {
            id: 7,
            name: 'LaLa',
            roleID: 1,
            alive: true,
        },
        {
            id: 8,
            name: 'C.Mai Anh',
            roleID: 1,
            alive: true,
        }];

        playerOut.value = [];
    }

    const setPlayer = (playerArr) => {
        player.value = [...playerArr];
    }

    const pushPlayerOut = (playerArr) => {
        playerOut.value = [...playerOut.value, ...playerArr];
    }

    const setPlayerOut = (playerArr) => {
        playerOut.value = [...playerArr];
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

    const getVillageAlive = () => {
        return player.value.filter(item => (item.alive == true && item.roleID !== 2));
    }

    const getPlayerDead = () => {
        return player.value.filter(item => item.alive == false);
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
                if(idRole == 2) { //add total wolf
                    const totalWolfCurrent = game.totalWolf;
                    game.setTotalWolf(totalWolfCurrent + 1);
                    game.setTotalWolfLive(game.totalWolf);
                }
                item.roleID = idRole;
                game.addLogGame(`Quản trò đã chọn ${item.name} trở thành ${role.getByID(idRole).name}`);
            }
        });
    }

    const isWolf = (idPlayer) => {
        const playerFind = player.value.find(item => item.id == idPlayer);
        if(playerFind.roleID == 2) {
            alert(`${playerFind.name} chính là sói!`);
            game.addLogGame(`Tiên tri đã soi trúng ${playerFind.name} là sói!`);
            return true;
        } else {
            alert(`${playerFind.name} không phải là sói!`);
            game.addLogGame(`Tiên tri đã soi nhầm ${playerFind.name}!`);
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
                                game.addLogGame(`Sói cắn trúng người được bảo vệ!`);
                                result = false;
                            } else {
                                if(item.roleID == 5) { //cắn trúng thợ săn
                                    alert('Sói cắn trúng thợ săn');
                                    game.addLogGame(`Sói cắn trúng thợ săn!`);
                                    night.addPlayerKilledByHunt(night.aimID);
                                } else if(item.roleID == 2) { //cắn trúng sói
                                    game.setTotalWolfLive(game.totalWolfLive - 1);
                                } else {
                                    alert(`${item.name} đã bị sói cắn chết`);
                                    game.addLogGame(`${item.name} đã bị sói cắn chết`);
                                }
                                item.alive = false;
                                result = true;
                            }
                            break;
                        case 'witch':
                            if(role.witchHasPoison) {
                                role.witchUsingPoison();
                                if(item.roleID == 2) { //nếu là sói
                                    game.setTotalWolfLive(game.totalWolfLive - 1);
                                    game.addLogGame(`Phù thủy đã ném độc chết sói!`);
                                } else if(item.roleID == 5) { //ném trúng thợ săn
                                    alert('Ném độc chết thợ săn');
                                    game.addLogGame(`Phù thủy đã ném độc chết thợ săn!`);
                                    night.addPlayerKilledByHunt(night.aimID);
                                } else {
                                    game.addLogGame(`Phù thủy đã ném độc chết ${item.name}!`);
                                }
                                item.alive = false;
                                result = true;
                            } else {
                                alert('Phù thủy không còn bình thuốc độc!')
                                result = false;
                            }
                            break;
                        case 'hunter':
                            alert(`${item.name} đã bị thợ săn bắn chết`);
                            game.addLogGame(`${item.name} đã bị thợ săn bắn chết`);
                            if(item.roleID == 2) { //nếu là sói
                                game.setTotalWolfLive(game.totalWolfLive - 1);
                            }
                            item.alive = false;
                            result = true;
                            break;
                        case 'lynch':
                            alert(`${item.name} đã bị treo cổ chết`);
                            game.addLogGame(`${item.name} đã bị treo cổ chết`);
                            if(item.roleID == 2) { //nếu là sói
                                game.setTotalWolfLive(game.totalWolfLive - 1);
                            }
                            if(item.roleID == 5) { //nếu là thợ săn
                                setDead(night.aimID, 'hunter');
                            }
                            item.alive = false;
                            result = true;
                            break;
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
                    role.witchUsingProtect();
                    night.removePlayerKilledByWolf(idPlayer);
                    item.alive = true;
                    game.addLogGame(`Phù thủy đã cứu mạng ${item.name}!`);
                    return true;
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
        playerOut,
        resetRole,
        setPlayerOut,
        pushPlayerOut,
        setPlayer,
        remove,
        add,
        getPlayerFree,
        getPlayerAlive,
        getPlayerDead,
        getPlayerByID,
        getVillageAlive,
        setRole,
        setDead,
        isWolf,
        revival,
        getPlayerRoleHunter
    }
}, {persist: true})