# stufftodo
Create stuff to do (games, events, group meetings, or anything) and allow others to register for participation.

## Models
### League
```
  name: <string>
  description: <string>
  owner: <Group>
  teams: [<Team>]
  schedule: [<Schedule>]
  start_date: <datetime>                            (league start date, overrides schedules)
  end_date: <datetime>                              (league end date, overrides schedules)
  min_teams_per_league: <integer>
  max_teams_per_league: <integer>
  min_teams_per_game: <integer>
  max_teams_per_game: <integer>
  min_players_per_team: <integer>
  max_players_per_team: <integer>
  allow_players_to_join_anytime: <boolean>        (if true, players can join teams anytime)
  allow_teams_to_join_anytime: <boolean>          (if true, teams can join league anytime)
  allow_teams_to_request_games: <boolean>          (if true, teams can submit game requests, else owner will request)
  allow_teams_to_approve_games: <boolean>         (if true, teams involved can approve games, else owner will approve)
  categories: [<string>]
  tags: [<string>]
  rating: <computed>
  rankings: [<Rank>]
  games: [<Game>]
```
### Schedule
```
  league: <League>
  time: <time>
  timeframe: <option>       (day of week, day of month, day of year, week of month, month of year, weekend of month)
  times: [<integer>]        [1,2] would be the 1st and 2nd <timeframe> so if timeframe is day of week, 1st and 2nd day of week, or Sunday and Monday
  repeat: <option>          (never, daily, weekly, monthly, quarterly, yearly)
  location: <location>
```
### Game
```
  league: <League>
  name: <string>
  photo: <blob>
  datetime: <datetime>
  teams: [<Team>]
  status: <string>          (proposed, scheduled, in progress, completed, cancelled, delayed)
  stats: [<GameStat>]
  rating: <Rating>
  approved: <boolean>       (games must be approved or created by league owner)
```
### GameStat
```
  game: <Game>
  team: <Team>
  points: <integer>         (how many points did this team earn)
  score: <integer>          (the score of the game if applicable)
  summary: <string>         (additional info)
  photo: <blob>             (optional photo)
  winner: <boolean>         (was this team the or a winner of the game)
```
### Team
```
  photo: <blob>
  name: <string>
  manager: <Group>
  members: [<User>]
```
### Rank
```
  league: <League>
  team: <Team>
  rank: <integer>         (the ranking value)
```
### Rating
```
  team: <Team>            (the team in the league doing the rating)
  game: <Game>            (the game in the league being rated)
  rate: <integer>         (the rate given)
```
### Location
```
  name: <string>
  address: <string>
  placeid: <string>
  poc: <Group>
```
### Group
```
  name: <string>
  users: [<User>]
```
### User
```
  name: <string>
  photo: <blob>
```

## Example Scenarios
### Spikeball
```
  name: Spikeball
  description: A scheduled meetup for whoever wants to play spikeball, each team is a single player and you need at least 4 to play.
  owner: <computed>
  min_teams_per_league: 4
  max_teams_per_league: 1000
  min_teams_per_game: 4
  max_teams_per_game: 1000
  min_players_per_team: 1
  max_players_per_team: 1
  categories: [sport, activity]
  tags: [spikeball, spike, ball, game, beach]
  teams: [
    - name: TimTeam
      manager: Tim
      members: [Tim]
    - name: NatTeam
      manager: Nat
      members: [Nat]
     - name: MattTeam
      manager: Matt
      members: [Matt]
    - name: LarryTeam
      manager: Larry
      members: [Larry]
  ]
  schedule: [
    - league: Spikeball
      time: 8:00 PM
      timeframe: day of week
      times: [4]
      repeat: weekly
      location:
        name: Bell Branch
  ]
  games: [
    - league: Spikeball
      name: Spikeball at Bell Branch 9/24/17
      datetime: Thursday August 24th, 2017 at 8:00 PM
      location:
        name: Bell Branch
      teams: [
        - name: TimTeam
          manager: Tim
          members: [Tim]
        - name: NatTeam
          manager: Nat
          members: [Nat]
        - name: MattTeam
          manager: Matt
          members: [Matt]
        - name: LarryTeam
          manager: Larry
          members: [Larry]
      ]
      status: completed
      stats: [
        - team: TimTeam
          winner: true
          points: 1
          score: 21
        - team: NatTeam
          winner: true
          points: 1
          score: 21
        - team: MattTeam
          winner: false
          points: 0
          score: 19
        - team: LarryTeam
          winner: false
          points: 0
          score: 19
      ]
  ]
```
### Feats of Strength
```
  name: Feats of Strength
  description: Annual Feats of Strength competition with event registration.
  owner: <computed>
  min_teams_per_league: 2
  max_teams_per_league: 1000
  min_teams_per_game: 1
  max_teams_per_game: 1000
  min_players_per_team: 1
  max_players_per_team: 1
  categories: [competition, social]
  tags: [feats, strength, festivus]
  teams: [
    - name: TimTeam
      manager: Tim
      members: [Tim]
    - name: NatTeam
      manager: Nat
      members: [Nat]
  ]
  schedule: [
    - league: Feats of Strength
      time: 8:00 AM
      timeframe: day of year
      times: [358]
      repeat: yearly
      location:
        name: Trilogy Farm
  ]
  games: [
    - league: Feats of Strength
      name: Push Up Contest
      datetime: December 24th at 8:00 AM
      location:
        name: Trilogy Farm
      teams: [
        - name: TimTeam
          manager: Tim
          members: [Tim]
        - name: TylerTeam
          manager: Tyler
          members: [Tyler]
        - name: AaronTeam
          manager: Aaron
          members: [Aaron]
      ]
      status: completed
      stats: [
        - team: TimTeam
          points: 5
          score: 60
          winner: true
        - team: AaronTeam
          points: 2
          score: 58
          winner: false
        - team: TylerTeam
          points: -1
          score: 55
          winner: false
      ]
    rankings: [
      - rank: 1,
        team: TimTeam
      - rank: 2
        team: AaronTeam
      - rank: 3
        team: TylerTeam
    ]
  ]
```
### Weekend Challenge
```
  name: Weekend Challenge
  description: Fun games to play on the weekend.
  owner: <computed>
  min_teams_per_league: 2
  max_teams_per_league: 1000
  min_teams_per_game: 2
  max_teams_per_game: 1000
  min_players_per_team: 1
  max_players_per_team: 1
  categories: [competition, activity, social]
  tags: [weekend, challenge, fun]
  teams: []
  schedule: [
    - league: Weekend Challenge
      time: 8:00 AM
      timeframe: weekend of month
      times: [1]
      repeat: monthly
      location:
        name: Online
  ]
  games: [
    - league: Weekend Challenge
      name: Best Meat Challenge
      allow_teams_to_request_games: true
      description: Upload a photo of your best cooked meat meal over the weekend.
      datetime: Friday 8:00 AM
      location:
        name: Online
      teams: []
      status: open
      stats: []
    rankings: []
  ]
```
