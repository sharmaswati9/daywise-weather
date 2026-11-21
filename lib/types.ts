export type Place = { id: string; name: string; city: string; category: string; description: string; image: string };
export type Task = { id: string; text: string; done: boolean };
export type Plan = { id: string; title: string; type: string; location: string; date: string; time: string; notes: string; tasks: Task[]; createdAt: number };
export type SavedPlace = Place;
