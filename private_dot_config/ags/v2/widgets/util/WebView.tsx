/** @jsxImportSource ags */

import { astalify, Gdk } from 'ags'
import WebKit from 'gi://WebKit'
import type { Gtk } from 'ags'

const WebKitWebView = astalify(WebKit.WebView)

type WebViewProps = {
  url: string
  onCreateChild?: (
    self: WebKit.WebView,
    navigationAction: WebKit.NavigationAction
  ) => Gtk.Widget | null
  class?: string
  width?: number
}

const WebView = ({
  url,
  onCreateChild,
  class: className = '',
  width,
}: WebViewProps) => {
  const setupWebView = (webView: WebKit.WebView) =>
    setTimeout(() => {
      webView.set_background_color(new Gdk.RGBA())
      webView.get_settings().set_javascript_can_open_windows_automatically(true)

      // Optionally enable developer extras if needed
      const shouldInspect = ARGV.includes('--inspect')
      if (shouldInspect) {
        webView.get_settings().set_enable_developer_extras(true)
        webView.get_inspector().show()
      }

      webView.connect(
        'create',
        (self: WebKit.WebView, navigationAction: WebKit.NavigationAction) =>
          onCreateChild?.(self, navigationAction) ?? null
      )

      webView.load_uri(url)
    })

  // Grab focus when the widget is mapped (shown)
  const handleMap = (self: WebKit.WebView) => {
    self.grab_focus()
  }

  return (
    <WebKitWebView
      class={`webkit-web-view ${className}`}
      setup={setupWebView}
      onMap={handleMap}
      canFocus={true}
      hexpand={true}
      vexpand={true}
      widthRequest={width}
    />
  )
}

export { WebView }
