// object is used to create state.json inside user data directory
export const persistentStateSeed = (): any => {
  return {
    vanilla: {
      name: 'Vanilla',
      servers: [
        {
          name: 'Covenant WoW',
          realmlist: 'logon.covenant-wow.com',
          website: 'https://www.covenant-wow.com/https://covenant-wow.com/',
        },
        {
          name: 'Elysium',
          realmlist: 'logon.elysium-project.org',
          website: 'https://www.elysium-project.org',
        },
        {
          name: 'Kronos',
          realmlist: 'login.kronos-wow.com',
          website: 'http://www.kronos-wow.com',
        },
        {
          name: `Light's Hope`,
          realmlist: 'logon.lightshope.org',
          website: 'https://www.lightshope.org',
        },
        {
          name: 'Firestorm (Blackrock)',
          realmlist: 'vanilla.logon.firestorm-servers.com',
          website: 'https://firestorm-servers.com/us/',
        },
        {
          name: 'NostalGeek',
          realmlist: 'auth.nostalgeek-serveur.com',
          website: 'https://www.nostalgeek-serveur.com/',
        },
        {
          name: 'Nostralia',
          realmlist: 'login.nostralia.org',
          website: 'https://nostralia.org/news',
        },
        {
          name: 'Retro WoW',
          realmlist: 'logon.retro-wow.com',
          website: 'http://retro-wow.com/news',
        },
        {
          name: 'Vanilla Awakened',
          realmlist: '147.135.254.223',
          website: 'https://vanilla.awakenednetwork.com/',
        },
        {
          name: 'Vanilla Gaming',
          realmlist: 'Logon.vanillagaming.org',
          website: 'http://www.vanillagaming.org/',
        },
      ],
      directory: '',
      selectedServerIndex: 0,
    },
    bc: {
      name: 'Burning Crusade',
      servers: [
        {
          name: 'Ares',
          realmlist: 'north.ares-wow.com',
          website: 'http://www.ares-wow.com/',
        },
        {
          name: 'Back2Basics',
          realmlist: 'logon.back2basics-wow.eu',
          website: 'https://www.back2basics-wow.eu/',
        },
        {
          name: 'DeathSide',
          realmlist: 'login.deathside.ru',
          website: 'http://deathside.ru/',
        },
        {
          name: 'Excalibur',
          realmlist: 'exwow-serv.exnw.com',
          website: 'http://www.excalibur.ws/',
        },
        {
          name: 'The Geek Crusade',
          realmlist: 'auth.thegeekcrusade-serveur.com',
          website: 'https://www.thegeekcrusade-serveur.com/',
        },
        {
          name: 'Korakion',
          realmlist: 'tbc.korakion.com',
          website: 'http://www.korakion.com/',
        },
        {
          name: 'Primal WoW',
          realmlist: 'login.truewow.org',
          website: 'https://truewow.org/',
        },
        {
          name: 'PsychoFun 2.4.3',
          realmlist: '176.31.182.217',
          website: 'http://wow.psycho-project.eu/',
        },
        {
          name: 'Smolderforge',
          realmlist: 'connect.smolderforge.com',
          website: 'https://www.smolderforge.com/site/',
        },
        {
          name: 'Vengeance WoW',
          realmlist: 'logon.vengeancewow.com',
          website: 'https://www.vengeancewow.com/',
        },
        {
          name: 'Warmane',
          realmlist: 'logon.warmane.com',
          website: 'https://www.warmane.com/',
        },
      ] as any,
      directory: '',
      selectedServerIndex: 0,
    },
    wotlk: {
      name: 'Wrath of the Lich King',
      servers: [
        {
          name: 'Dalaran WoW',
          realmlist: 'logon.dalaran-realmlist.org ',
          website: 'http://www.dalaran-wow.com/',
        },
        {
          name: 'Deffender',
          realmlist: 'logon.deffender.eu',
          website: 'https://deffender.eu/',
        },
        {
          name: 'Eternal WoW',
          realmlist: 'logon.eternal-wow.com',
          website: 'http://eternal-wow.com/',
        },
        {
          name: 'Firestorm (Icecrown)',
          realmlist: 'wotlk.logon.firestorm-servers.com',
          website: 'https://firestorm-servers.com/us/',
        },
        {
          name: 'Frostgate',
          realmlist: 'play.frostgale.com',
          website: 'https://frostgale.com/news.php',
        },
        {
          name: 'Gamer District',
          realmlist: 'wow.gamer-district.org',
          website: 'https://www.gamer-district.org/',
        },
        {
          name: 'Laenalith WoW',
          realmlist: 'logon.laenalith-wow.com',
          website: 'https://www.laenalith-wow.com/',
        },
        {
          name: 'Nexus WoW',
          realmlist: 'realmlist nexuswow.org',
          website: 'http://nexuswow.org/',
        },
        {
          name: 'OmegaWoW',
          realmlist: 'logon.omegawow.eu',
          website: 'http://omegawow.eu/news',
        },
        {
          name: `Red's Realm`,
          realmlist: 'redsrealm.dyndns.org',
          website: 'http://redsrealm.us/',
        },
        {
          name: 'Rising Gods',
          realmlist: 'logon.rising-gods.de',
          website: 'https://www.rising-gods.de/',
        },
        {
          name: 'Sunwell',
          realmlist: 'logon.sunwell.pl',
          website: 'https://sunwell.pl/',
        },
        {
          name: 'TrueWoW',
          realmlist: 'login.truewow.org',
          website: 'https://truewow.org/',
        },
        {
          name: 'TwinStart (Hyperion)',
          realmlist: 'wow.twinstar.cz',
          website: 'http://www.twinstar.cz/?lang=en',
        },
        {
          name: 'Warmane',
          realmlist: 'logon.warmane.com',
          website: 'https://www.warmane.com/',
        },
        {
          name: 'WoW Circle',
          realmlist: 'logon.wowcircle.com',
          website: 'http://wowcircle.com/en/',
        },
        {
          name: 'WoW Mania',
          realmlist: 'wotlk.wow-mania.com',
          website: 'http://www.wow-mania.com/',
        },
        {
          name: 'WoW Mortal',
          realmlist: 'logon.wowmortal.com ',
          website: 'https://wowmortal.com/',
        },
        {
          name: 'WoW Sulvus',
          realmlist: 'wowsulvus.es',
          website: 'http://wowsulvus.es/fusion/',
        },
        {
          name: 'WoWGasm Reloaded',
          realmlist: 'logon.wowgasm-reloaded.org',
          website: 'https://wowgasm-reloaded.org/',
        },
        {
          name: 'World of the Gods',
          realmlist: 'logon.worldofthegods.com',
          website: 'https://www.worldofthegods.com/',
        },
      ] as any,
      directory: '',
      selectedServerIndex: 0,
    },
    cata: {
      name: 'Cataclysm',
      servers: [
        {
          name: 'Atlantiss',
          realmlist: 'play.atlantiss.eu',
          website: 'https://atlantiss.eu/',
        },
        {
          name: 'Eternal-WoW (Apocalypse',
          realmlist: 'logon.eternal-wow.com',
          website: 'http://eternal-wow.com/',
        },
        {
          name: 'Firestorm (Deathwing)',
          realmlist: 'cata.logon.firestorm-servers.com',
          website: 'https://firestorm-servers.com/us/',
        },
        {
          name: 'GPLP',
          realmlist: '37.187.171.126',
          website: 'http://guerrerosporlapaz.com/',
        },
        {
          name: 'Monster WoW',
          realmlist: 'logon.monster-wow.com',
          website: 'https://monster-wow.com/',
        },
        {
          name: 'Titans of WoW',
          realmlist: 'wow.titansofwow.com',
          website: 'https://www.titansofwow.com/',
        },
        {
          name: 'TwinStar (Artemis)',
          realmlist: 'wow.twinstar.cz',
          website: 'http://www.twinstar.cz/?lang=en',
        },
        {
          name: 'Warmane',
          realmlist: 'logon.warmane.com',
          website: 'https://www.warmane.com/',
        },
        {
          name: 'WoW Circle',
          realmlist: 'logon3.wowcircle.com',
          website: 'http://wowcircle.com/en/',
        },
        {
          name: 'WoWMortal (Destiny)',
          realmlist: 'logon.wowmortal.com',
          website: 'https://wowmortal.com/',
        },
      ] as any,
      directory: '',
      selectedServerIndex: 0,
    },
  };
};
