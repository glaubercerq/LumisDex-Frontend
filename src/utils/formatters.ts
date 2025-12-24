export function formatPokemonId(id: number): string {
  return `#${id.toString().padStart(3, '0')}`
}

export function formatPokemonName(name: string): string {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function formatHeight(height: number): string {
  const meters = height / 10
  return `${meters.toFixed(1)} m`
}

export function formatWeight(weight: number): string {
  const kg = weight / 10
  return `${kg.toFixed(1)} kg`
}

