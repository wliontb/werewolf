export const useRoleStore = defineStore('role', () => {
    const role = ref([
        {
            id: 1,
            name: 'Dân thường',
            nameEng: 'Villager',
            faction: 'human',
            active: true
        },
        {
            id: 2,
            name: 'Ma sói',
            nameEng: 'Werewolve',
            faction: 'wolf',
            active: true
        },
        {
            id: 3,
            name: 'Bảo vệ',
            nameEng: 'Guardian',
            faction: 'human',
            active: true
        },
        {
            id: 4,
            name: 'Phù thủy',
            nameEng: 'Witch',
            faction: 'human',
            active: true
        },
        {
            id: 5,
            name: 'Thợ săn',
            nameEng: 'Hunter',
            faction: 'human',
            active: true
        },
        {
            id: 6,
            name: 'Tiên tri',
            nameEng: 'Fortune Teller',
            faction: 'human',
            active: true
        },
        {
            id: 7,
            name: 'Thần tình yêu',
            nameEng: 'Cupido',
            faction: 'third',
            active: false
        },
        {
            id: 8,
            name: 'Tarzan',
            nameEng: 'Tarzan',
            faction: 'third',
            active: false
        }
    ]);

    const witchHasPoison = ref(true);
    const witchHasProtect = ref(true);

    function $reset() {
        role.value = [
            {
                id: 1,
                name: 'Dân thường',
                nameEng: 'Villager',
                faction: 'human',
                active: true
            },
            {
                id: 2,
                name: 'Ma sói',
                nameEng: 'Werewolve',
                faction: 'wolf',
                active: true
            },
            {
                id: 3,
                name: 'Bảo vệ',
                nameEng: 'Guardian',
                faction: 'human',
                active: true
            },
            {
                id: 4,
                name: 'Phù thủy',
                nameEng: 'Witch',
                faction: 'human',
                active: true
            },
            {
                id: 5,
                name: 'Thợ săn',
                nameEng: 'Hunter',
                faction: 'human',
                active: true
            },
            {
                id: 6,
                name: 'Tiên tri',
                nameEng: 'Fortune Teller',
                faction: 'human',
                active: true
            },
            {
                id: 7,
                name: 'Thần tình yêu',
                nameEng: 'Cupido',
                faction: 'third',
                active: false
            },
            {
                id: 8,
                name: 'Tarzan',
                nameEng: 'Tarzan',
                faction: 'third',
                active: false
            }
        ];
    }

    function $resetGame() {
        witchHasPoison.value = true;
        witchHasProtect.value = true;
    }

    const witchUsingProtect = () => {
        witchHasProtect.value = false;
    }

    const witchUsingPoison = () => {
        witchHasPoison.value = false;
    }

    const totalActive = () => {
        return role.value.filter(item => item.active === true).length;
    }

    const checkNameExist = (name) => {
        return role.value.some(item => item.name.toUpperCase() == name.toUpperCase());
    }

    const addRole = (name, faction = 'human', using = false) => {
        if(checkNameExist(name)) {
            alert('Trùng tên vai trò');
            return;
        }
        let lastId = 0; // Khởi tạo lastId với giá trị mặc định
        if (role.value.length > 0) {
            lastId = role.value[role.value.length - 1].id;
        }
        const newRole = {
            id: lastId+1,
            name: name,
            nameEng: name.toUpperCase,
            faction: faction,
            active: using
        }
        role.value.push(newRole);
    }

    const getByID = (id) => {
        return role.value.find(item => item.id == id);
    }

    const toggleActive = (id) => {
        role.value.forEach(item => {
          if (item.id === id) {
            item.active = !item.active;
          }
        });
    };

    return {
        $reset,
        $resetGame,
        role, witchHasPoison, witchHasProtect,
        toggleActive,
        totalActive,
        getByID,
        witchUsingPoison,
        witchUsingProtect
    }
})