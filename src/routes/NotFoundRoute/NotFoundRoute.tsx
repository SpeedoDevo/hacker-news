import { TranslationFunction } from 'i18next'
import React, { ReactNode } from 'react'
import { NamespacesConsumer } from 'react-i18next'
import { Route } from 'react-router-dom'
import DocumentTitle from '../../DocumentTitle/DocumentTitle'
import EmptyPlaceHolder from '../../EmptyPlaceholder/EmptyPlaceHolder'
import { RouteConfig, withSuspense } from '../util'

class NotFoundRoute implements RouteConfig {
  public makeURL(): never {
    throw new Error('cannot make 404 URL')
  }

  public use(): ReactNode {
    return withSuspense(
      <Route>
        <NamespacesConsumer ns={'NotFoundRoute'}>
          {this._render}
        </NamespacesConsumer>
      </Route>,
    )
  }

  private _render(t: TranslationFunction): ReactNode {
    return (
      <>
        <DocumentTitle>{t('title')}</DocumentTitle>
        <EmptyPlaceHolder message={t('empty')} />
      </>
    )
  }
}

export default new NotFoundRoute()
