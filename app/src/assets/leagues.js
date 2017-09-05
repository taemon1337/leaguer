export default {
  leagues: [
    {
      leagueId: '111111111111111',
      photo: 'http://assets.academy.com/mgen/01/10811301.jpg',
      photo2: 'https://yt3.ggpht.com/-SJOSohGCGEs/AAAAAAAAAAI/AAAAAAAAAAA/IKZoTuSsH3Q/s900-c-k-no-mo-rj-c0xffffff/photo.jpg',
      title: 'Friendly Spikeball',
      subtitle: '',
      description: 'This is an unofficial friendly meetup of people who want to play Spikeball occassionally.',
      city: 'Annapolis',
      state: 'Maryland',
      country: 'USA',
      min_teams_per_league: 4,
      max_teams_per_league: 1000,
      min_teams_per_game: 4,
      max_teams_per_game: 12,
      min_players_per_team: 1,
      max_players_per_team: 1,
      allow_players_to_join_anytime: true,
      allow_teams_to_join_anytime: true,
      allow_teams_to_request_games: true,
      allow_teams_to_approve_games: true,
      categories: ['sports', 'social'],
      tags: ['spike', 'ball', 'beach'],
      games: [
        {
          name: 'Open Game',
          datetime: new Date(),
          status: 'proposed',
          approved: false
        },
        {
          name: 'Private Game',
          datetime: new Date(),
          status: 'proposed',
          approved: true
        }
      ]
    },
    {
      leagueId: '2222222222222',
      title: 'Feats of Strength',
      subtitle: 'Festivus Reborn',
      photo: 'https://domfpalumbo.files.wordpress.com/2013/12/palumbofestivus7.jpg',
      description: 'Holiday Festivus Feats of Strength competition.',
      city: 'Annapolis',
      state: 'Maryland',
      country: 'USA',
      min_teams_per_league: 2,
      max_teams_per_league: 1000,
      min_teams_per_game: 1,
      max_teams_per_game: 10000,
      min_players_per_team: 1,
      max_players_per_team: 1,
      allow_players_to_join_anytime: true,
      allow_teams_to_join_anytime: true,
      allow_teams_to_request_games: true,
      allow_teams_to_approve_games: true,
      categories: ['competition', 'activity'],
      tags: ['festivus', 'feats', 'strength']
    }
  ],
  teams: [
    {
      name: 'Tim Team',
      photo: null,
      managerGroupId: 'Group1'
    }
  ],
  groups: [
    {
      groupId: 'Group1',
      name: 'Tim Group',
      userIds: ['User1']
    }
  ],
  users: [
    {
      userId: 'User1',
      name: 'Tim',
      photo: null
    }
  ],
  locations: [
    {
      name: 'Stellar Riding',
      address: 'Address',
      placeid: 'ChIJs5QraMHxt4kRfz2wYJuqle4',
      poc: 'Group1'
    }
  ]
}
