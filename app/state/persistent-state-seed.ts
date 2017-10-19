// object is used to create state.json inside user data directory
export const persistentStateSeed = (): any => {
  return {
    vanilla: {
      name: 'Vanilla',
      servers: [
        {
          name: 'Lights Hope',
          realmlist: 'logon.lightshope.org',
          website: 'www.lightshope.org',
        },
        {
          name: 'Elysium',
          realmlist: '',
          website: 'www.elysium-project.org',
        },
        {
          name: 'Kronos',
          realmlist: 'login.kronos-wow.com',
          website: 'www.kronos-wow.com',
        },
      ],
      directory: '',
      selectedServerIndex: 0,
    },
    bc: {
      name: 'Burning Crusade',
      servers: [] as any,
      directory: '',
      selectedServerIndex: 0,
    },
    wotlk: {
      name: 'Wrath of the Lich King',
      servers: [] as any,
      directory: '',
      selectedServerIndex: 0,
    },
  };
};
