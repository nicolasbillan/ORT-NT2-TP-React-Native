export function exerciseTagParse(exercise) {
  if (exercise.tags) return { ...exercise };
  let tags = [];
  addIfNotExists(tags, exercise.nombre);
  addIfNotExists(tags, exercise.dificultad);
  addIfNotExists(tags, exercise.tipo);

  if (Array.isArray(exercise.elementos)) {
    exercise.elementos.forEach((e) => {
      addIfNotExists(tags, e);
    });
  } else {
    addIfNotExists(tags, exercise.elementos);
  }

  exercise["musculos principales"].forEach((e) => {
    addIfNotExists(tags, e);
  });

  exercise["musculos secundarios"].forEach((e) => {
    addIfNotExists(tags, e);
  });
  return { ...exercise, tags: tags };
}

function addIfNotExists(array, element) {
  if (array.indexOf(element) === -1) array.push(element);
}
