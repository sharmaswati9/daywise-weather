export type GeoResult = { name: string; country: string; admin1?: string; latitude: number; longitude: number };
export type DailyWeather = { date: string; max: number; min: number; code: number; rain: number; wind: number; uv: number };
export type CurrentWeather = { temperature: number; feelsLike: number; code: number; wind: number };
export type WeatherData = { current: CurrentWeather; daily: DailyWeather[] };

export async function searchCities(query: string): Promise<GeoResult[]> {
  if (query.trim().length < 2) return [];
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=8&language=en&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Could not search for that place.');
  const data = await res.json();
  return (data.results || []).map((x: any) => ({ name: x.name, country: x.country, admin1: x.admin1, latitude: x.latitude, longitude: x.longitude }));
}

export async function getWeather(latitude: number, longitude: number): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: String(latitude), longitude: String(longitude),
    current: 'temperature_2m,apparent_temperature,weather_code,wind_speed_10m',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,uv_index_max',
    timezone: 'auto', forecast_days: '14'
  });
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  if (!res.ok) throw new Error('Weather is temporarily unavailable.');
  const data = await res.json();
  const daily = data.daily.time.map((date: string, i: number) => ({ date, max: Math.round(data.daily.temperature_2m_max[i]), min: Math.round(data.daily.temperature_2m_min[i]), code: data.daily.weather_code[i], rain: data.daily.precipitation_probability_max[i] ?? 0, wind: Math.round(data.daily.wind_speed_10m_max[i] ?? 0), uv: Math.round(data.daily.uv_index_max[i] ?? 0) }));
  return { current: { temperature: Math.round(data.current.temperature_2m), feelsLike: Math.round(data.current.apparent_temperature), code: data.current.weather_code, wind: Math.round(data.current.wind_speed_10m) }, daily };
}

export function weatherLabel(code: number): string {
  if (code === 0) return 'Clear sky';
  if ([1, 2].includes(code)) return 'Mostly clear';
  if (code === 3) return 'Cloudy';
  if ([45, 48].includes(code)) return 'Foggy';
  if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle';
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'Rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snow';
  if ([95, 96, 99].includes(code)) return 'Thunderstorms';
  return 'Variable conditions';
}
export function weatherIcon(code: number): string {
  if (code === 0) return '☀️';
  if ([1, 2].includes(code)) return '🌤️';
  if (code === 3) return '☁️';
  if ([45, 48].includes(code)) return '🌫️';
  if ([51,53,55,56,57,61,63,65,66,67,80,81,82].includes(code)) return '🌧️';
  if ([71,73,75,77,85,86].includes(code)) return '❄️';
  if ([95,96,99].includes(code)) return '⛈️';
  return '🌥️';
}
