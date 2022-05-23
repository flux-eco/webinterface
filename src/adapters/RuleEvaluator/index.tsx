
export function evaluateRules(
  rules: API.rule[],
  item: []
):boolean {
  let evaluationResult = false;
  rules.forEach((rule: API.rule) => {
    if (rule.attributeName !== undefined) {
      const itemKey = rule.attributeName;
      if (rule.value !== undefined && rule.condition === 'isEqual') {
        if (item[itemKey] === rule.value) {
          evaluationResult = true;
        } else {
          return false;
        }
      }
      if (rule.condition === 'isUndefined') {
        if (item[itemKey] === undefined) {
          evaluationResult = true;
        }
      } else {
        return false;
      }
    }
  });
  return evaluationResult;
};
