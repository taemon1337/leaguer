export default {
  leagues: [
    {
      leagueId: "111111111111111",
      name: 'Friendly Spikeball',
      description: 'This is an unofficial friendly meetup of people who want to play Spikeball occassionally.',
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
      categories: ["sports", "social"],
      tags: ["spike", "ball", "beach"]
    },
    {
      leagueId: "2222222222222",
      name: 'Feats of Strength',
      description: 'Holiday Festivus Feats of Strength competition.',
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
      categories: ["competition", "activity"],
      tags: ["festivus", "feats", "strength"]
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