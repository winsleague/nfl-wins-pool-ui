export default interface PlayerStandingModel {
  Player: string;
  Wins: number;
  Losses: number;
  Ties: number;
  Pct: number;
  PointDiff: number;
  WeekResult: string;
  WeekDiff: number;
  Last10W: number;
  Last10L: number;
  Last10: string;
  WeekTeams: string;
}
