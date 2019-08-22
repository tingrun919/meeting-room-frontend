import { Model, EffectsCommandMap, ReducersMapObjectWithEnhancer, EffectsMapObject } from 'dva';
import { AnyAction, Dispatch } from 'redux';

interface EnhancedPut {
  <A extends AnyAction>(action: A): any;

  resolve: Dispatch;
}

interface EnhancedEffectsCommandMap extends EffectsCommandMap {
  put: EnhancedPut;
}

/**
 * Effects 类型，修复了EffectsCommandMap 中没有put.resolve 的问题
 *
 * @template T 每个effect 与Action 的Mapping
 */
export type EffectsActionsMapping<T = any> = {
  [K in keyof T]: (action: T[K], effects: EnhancedEffectsCommandMap) => IterableIterator<any>;
};

/**
 * umi + dva 的Model 定义
 *
 * @template R Reducers 的类型，默认与dva 相同
 * @template E Effects 的类型，默认与dva 相同
 */
export interface DvaUmiModel<R = ReducersMapObjectWithEnhancer, E = EffectsMapObject>
  extends Omit<Model, 'namespace' | 'reducers' | 'effects'> {
  namespace?: string;
  reducers: R;
  effects: E;
}
