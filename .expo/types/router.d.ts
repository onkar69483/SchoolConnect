/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/Notices` | `/(tabs)/calendar` | `/(tabs)/explore` | `/(tabs)/profile` | `/..\components\InputField` | `/..\components\auth\AuthHeader` | `/..\components\auth\auth` | `/..\components\calendar\agendaCalendar` | `/..\components\navigation\TabBarIcon` | `/..\redux\authSlice` | `/..\redux\hooks` | `/..\redux\store` | `/..\types\auth` | `/Notices` | `/_sitemap` | `/calendar` | `/explore` | `/profile`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
