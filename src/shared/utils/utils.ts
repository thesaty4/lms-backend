import { TForceAny } from '../types';

/** @function filterObject, will be provide functionality to filter you object */
export function filterObject<
  DType extends object, // Generic object type
  ExcludedKType extends keyof DType = keyof DType, // Keys to exclude
  IncludeKType extends keyof DType = keyof DType, // Keys to include
>(
  obj: DType,
  config?: {
    isDB?: boolean;
    excludedKeys?: ExcludedKType[];
    includedKeys?: IncludeKType[];
  },
) {
  const { excludedKeys = [], includedKeys = [] } = config || {};

  // Use reduce to construct the filtered object
  const data = Object.entries(
    config?.isDB ? (obj as TForceAny).toObject() : obj,
  ).reduce((acc, [key, value]) => {
    const keyAsExcluded = key as ExcludedKType;
    const keyAsIncluded = key as IncludeKType;

    if (excludedKeys?.length) {
      // Include all keys except those in excludedKeys
      return excludedKeys.includes(keyAsExcluded)
        ? acc
        : { ...acc, [key]: value };
    } else if (includedKeys?.length) {
      // Include only keys in includedKeys
      return includedKeys.includes(keyAsIncluded)
        ? { ...acc, [key]: value }
        : acc;
    } else return { ...acc, [key]: value };
  }, {} as Partial<DType>);

  // TODO: we can return conditional type based on the config, we will fix later on
  // if (excludedKeys?.length && isAll) {
  //   return data as Omit<DType, ExcludedKType>
  // } else if (includedKeys?.length && !isAll) {
  //   return data as Pick<DType, IncludeKType>
  // } else {
  //   return data as Partial<DType>
  // }

  return data as DType;
}
