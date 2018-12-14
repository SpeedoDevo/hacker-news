import mem from 'mem'
import {
  Storage as StorageInterface,
  StorageBase,
  StorageFactory,
} from '../interfaces'
import NamespacedAbstractStorage from '../NamespacedAbstractStorage/NamespacedAbstractStorage'

class LocalStorage<T extends StorageBase> extends NamespacedAbstractStorage<T> {
  public static create: StorageFactory['create'] = mem<
    StorageFactory['create']
  >(
    <T extends StorageBase>(namespace: string): StorageInterface<T> => {
      return new LocalStorage(namespace)
    },
  )

  private _namespace: string
  private constructor(namespace: string) {
    if (!window.localStorage) {
      throw new Error('no local storage')
    }
    super()
    this._namespace = namespace
  }

  protected get namespace(): string {
    return this._namespace
  }

  protected get storage(): Storage {
    return localStorage
  }
}

export default LocalStorage as StorageFactory
