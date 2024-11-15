// Enum 정의 (기존 그대로 사용)
enum ProgramEnum {
  SCREEN_GOLF = '스크린 골프',
  GOLF_PRACTICE = '골프 연습장',
  GOLF_LESSON = '골프 레슨',
  FIELD = '필드',

  SINGLE = '단식',
  DOUBLE = '복식',
  ONEDAY = '일일권',
  TIME = '시간권',

  NORMAL_BALLING = '일반 볼링',
  ROCK_BALLING = '락볼링',

  MEDIUM_TABLE = '중대',
  BIG_TABLE = '대대',
  POCKET_BALL = '포켓볼',

  FOOTBALL_FIELD = '축구장 대여',
  FOOTBALL_MACHINE = '축구 볼머신',

  SCREEN_BASEBALL = '스크린야구',
  BASEBALL_PRACTICE = '야구연습장',
  MAJOR_ROOM = '메이저룸',
  MINOR_ROOM = '마이너룸',
  PITCHING = '피칭',
  BATTING = '배팅',

  TENNIS_COURT = '테니스 코트',
  TENNIS_LESSON = '테니스 레슨',
  TENNISBALL_MACHINE = '테니스 볼 머신',

  SQUASH_PRACTICE = '스쿼시 연습장',
  SQAUSH_LESSON = '스쿼시 레슨',
  ONE_DAY_CLASS = '스쿼시 원데이 클래스',
}

// 1. 매핑 객체 생성
const programNameMap: Record<keyof typeof ProgramEnum, string> = {
  SCREEN_GOLF: ProgramEnum.SCREEN_GOLF,
  GOLF_PRACTICE: ProgramEnum.GOLF_PRACTICE,
  GOLF_LESSON: ProgramEnum.GOLF_LESSON,
  FIELD: ProgramEnum.FIELD,

  SINGLE: ProgramEnum.SINGLE,
  DOUBLE: ProgramEnum.DOUBLE,
  ONEDAY: ProgramEnum.ONEDAY,
  TIME: ProgramEnum.TIME,

  NORMAL_BALLING: ProgramEnum.NORMAL_BALLING,
  ROCK_BALLING: ProgramEnum.ROCK_BALLING,

  MEDIUM_TABLE: ProgramEnum.MEDIUM_TABLE,
  BIG_TABLE: ProgramEnum.BIG_TABLE,
  POCKET_BALL: ProgramEnum.POCKET_BALL,

  FOOTBALL_FIELD: ProgramEnum.FOOTBALL_FIELD,
  FOOTBALL_MACHINE: ProgramEnum.FOOTBALL_MACHINE,

  SCREEN_BASEBALL: ProgramEnum.SCREEN_BASEBALL,
  BASEBALL_PRACTICE: ProgramEnum.BASEBALL_PRACTICE,
  MAJOR_ROOM: ProgramEnum.MAJOR_ROOM,
  MINOR_ROOM: ProgramEnum.MINOR_ROOM,
  PITCHING: ProgramEnum.PITCHING,
  BATTING: ProgramEnum.BATTING,

  TENNIS_COURT: ProgramEnum.TENNIS_COURT,
  TENNIS_LESSON: ProgramEnum.TENNIS_LESSON,
  TENNISBALL_MACHINE: ProgramEnum.TENNISBALL_MACHINE,

  SQUASH_PRACTICE: ProgramEnum.SQUASH_PRACTICE,
  SQAUSH_LESSON: ProgramEnum.SQAUSH_LESSON,
  ONE_DAY_CLASS: ProgramEnum.ONE_DAY_CLASS,
};

// 2. 프로그램 이름을 통해 한국어 설명을 반환하는 함수
export function getProgramDescription(programName: string): string {
  return (
    programNameMap[programName as keyof typeof ProgramEnum] ||
    '알 수 없는 프로그램'
  );
}

