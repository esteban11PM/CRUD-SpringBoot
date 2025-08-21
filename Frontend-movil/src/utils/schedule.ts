export const parseISO = (iso: string) => new Date(iso);

const addDuration = (start: Date, durationHHmmss: string) => {
    const [h, m, s] = durationHHmmss.split(":").map(Number);
    const end = new Date(start.getTime());
    end.setHours(end.getHours() + (h || 0));
    end.setMinutes(end.getMinutes() + (m || 0));
    end.setSeconds(end.getSeconds() + (s || 0));
    return end;
};

// true si se solapan
export const overlaps = (startA: Date, endA: Date, startB: Date, endB: Date) =>
    startA < endB && startB < endA;

export const classEnd = (cls: { schedule: string; duration: string }) =>
    addDuration(parseISO(cls.schedule), cls.duration);
