import data from '@/data/birthrate.json';

interface Region {
  id: string;
  name: string;
  total: number;
  male: number;
  female: number;
}

export interface BirthResult {
  province: string;
  id: string;
  gender: string;
  probability: number;
}

export const regions: Region[] = data.region.slice(1); // Do not include the first element

const totalBirths: number = regions.reduce(
  (sum, region) => sum + region.total,
  0
);

const provinceProbabilities: {
  [key: string]: { male: number; female: number };
} = {};

regions.forEach(region => {
  provinceProbabilities[region.id] = {
    male: region.male / totalBirths,
    female: region.female / totalBirths
  };
});

export function simulateBirth(): BirthResult {
  const random: number = Math.random();
  let cumulativeProbability = 0;

  for (const province in provinceProbabilities) {
    const { male, female } = provinceProbabilities[province];
    const totalProbability = male + female;
    cumulativeProbability += totalProbability;

    if (random <= cumulativeProbability) {
      const genderRandom = random - (cumulativeProbability - totalProbability);
      const genderProbability = male / totalProbability;
      const provinceData = regions.find(region => region.id === province);
      if (provinceData) {
        const gender =
          genderRandom <= genderProbability * totalProbability
            ? 'male'
            : 'female';
        const probability = gender === 'male' ? male : female;
        const result = {
          province: provinceData.name,
          id: provinceData.id,
          gender: gender,
          probability: probability
        };
        // console.log(
        //   `A baby is born in ${result.province} (${result.id}), gender: ${result.gender}, probability: ${result.probability}`
        // );
        return result;
      }
    }
  }

  const defaultResult = {
    province: 'Unknown',
    id: 'Unknown',
    gender: 'Unknown',
    probability: 0
  };
  // console.log(
  //   `A baby is born in ${defaultResult.province} (${defaultResult.id}), gender: ${defaultResult.gender}, probability: ${defaultResult.probability}`
  // );
  return defaultResult;
}

export function translateGender(gender: string): string {
  switch (gender) {
    case 'male':
      return '男';
    case 'female':
      return '女';
    default:
      return gender;
  }
}

export function translateGenderChild(gender: string): string {
  switch (gender) {
    case 'male':
      return '男孩';
    case 'female':
      return '女孩';
    default:
      return gender;
  }
}
