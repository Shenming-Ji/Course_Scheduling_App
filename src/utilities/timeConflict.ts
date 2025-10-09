type ParsedMeeting = {
  days: Set<string>;
  start: number; 
  end: number;   
} | null;

function parseTimeToMinutes(t: string): number {
  const [hh, mm] = t.split(":").map(Number);
  return hh * 60 + mm;
}

function parseDays(daysStr: string): Set<string> {
  const result = new Set<string>();
  for (let i = 0; i < daysStr.length; ) {
    const two = daysStr.slice(i, i + 2);
    if (two === 'Tu' || two === 'Th' || two === 'Sa' || two === 'Su') {
      result.add(two);
      i += 2;
    } else {
      result.add(daysStr[i]);
      i += 1;
    }
  }
  return result;
}

export function parseMeeting(meets: string): ParsedMeeting {
  if (!meets || meets.trim() === '') return null;
  const parts = meets.trim().split(' ');
  if (parts.length < 2) return null;
  const daysStr = parts[0];
  const timeRange = parts[1];
  const [startStr, endStr] = timeRange.split('-');
  if (!startStr || !endStr) return null;
  const days = parseDays(daysStr);
  const start = parseTimeToMinutes(startStr);
  const end = parseTimeToMinutes(endStr);
  return { days, start, end };
}

export function daysOverlap(a: Set<string>, b: Set<string>): boolean {
  for (const d of a) if (b.has(d)) return true;
  return false;
}

export function timesOverlap(aStart: number, aEnd: number, bStart: number, bEnd: number): boolean {
  return aStart < bEnd && aEnd > bStart;
}

export function meetingsConflict(meetsA: string, meetsB: string): boolean {
  const a = parseMeeting(meetsA);
  const b = parseMeeting(meetsB);
  if (!a || !b) return false; 
  if (!daysOverlap(a.days, b.days)) return false;
  return timesOverlap(a.start, a.end, b.start, b.end);
}

export function coursesConflict(a: { term: string; meets: string }, b: { term: string; meets: string }): boolean {
  if (a.term !== b.term) return false;
  return meetingsConflict(a.meets, b.meets);
}

export default {
  parseMeeting,
  meetingsConflict,
  coursesConflict,
};
