import { ThemeProvider } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import HeaderAppBar from "components/AppHeader";
import CheckAuth from "components/CheckAuth/CheckAuth";
import { theme } from "components/CustomRecurrence/ThemeProviderStyle";
import InitApp from "components/InitApp";
import RequireAuth from "components/RequireAuth";
import { SnackbarProvider } from "notistack";
import AuthProvider from "providers/AuthProvider";
import HttpProvider from "providers/HttpProvider";
import React, { Suspense, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { store } from "redux/store";
import { CampaignDetailsScreen } from "screens/CampaignDetailsScreen";
import { CampaignScreen } from "screens/CampaignScreen";

import "./style.css";
import { DateUtils } from "@bikairproject/utils/dist/utils/DateUtils";

const RolesDetailsScreen = React.lazy(
  () => import("screens/RolesDetailsScreen")
);
const RolesScreen = React.lazy(() => import("screens/RolesScreen"));
const AdminDetailsScreen = React.lazy(
  () => import("screens/AdminDetailsScreen")
);
const AdminsScreen = React.lazy(() => import("screens/AdminsScreen"));
const BikeDetailsScreen = React.lazy(() => import("screens/BikeDetailsScreen"));
const BikeEditScreen = React.lazy(() => import("screens/BikeEditScreen"));
const BikesMapScreen = React.lazy(() => import("screens/BikesMapScreen"));
const BikesScreen = React.lazy(() => import("screens/BikesScreen"));
const DiscountDetailsScreen = React.lazy(
  () => import("screens/DiscountDetailsScreen")
);
const DiscountsScreen = React.lazy(() => import("screens/DiscountsScreen"));
const LoginScreen = React.lazy(() => import("screens/LoginScreen"));
const NotificationScreen = React.lazy(
  () => import("screens/NotificationScreen")
);
const ProfileScreen = React.lazy(() => import("screens/ProfileScreen"));
const ReportsScreen = React.lazy(() => import("screens/ReportsScreen"));
const ReviewsScreen = React.lazy(() => import("screens/ReviewsScreen"));
const SettingsScreen = React.lazy(() => import("screens/SettingsScreen"));
const SpotDetailsScreen = React.lazy(() => import("screens/SpotDetailsScreen"));
const SpotsScreen = React.lazy(() => import("screens/SpotsScreen"));
const SubscriptionDetailScreen = React.lazy(
  () => import("screens/SubscriptionDetailScreen/SubscriptionDetailScreen")
);
const SubscriptionsScreen = React.lazy(
  () => import("screens/SubscriptionsScreen/SubscriptionsScreen")
);
const TripsScreen = React.lazy(() => import("screens/TripsScreen"));
const TripDetailsScreen = React.lazy(() => import("screens/TripDetailsScreen"));
const TripForceEndScreen = React.lazy(
  () => import("screens/TripForceEndScreen")
);
const TripEditStatusScreen = React.lazy(
  () => import("screens/TripEditStatutScreen")
);
const UserDetailsScreen = React.lazy(() => import("screens/UserDetailsScreen"));
const UsersScreen = React.lazy(() => import("screens/UsersScreen"));
const HomeScreen = React.lazy(() => import("screens/HomeScreen"));
const CautionsScreen = React.lazy(() => import("screens/CautionsScreen"));
const RedZoneScreen = React.lazy(() => import("screens/RedZoneScreen"));
const RedZoneDetailsScreen = React.lazy(
  () => import("screens/RedZoneDetailsScreen")
);
const CityPolygonScreen = React.lazy(() => import("screens/CityPolygonScreen"));
const CityPolygonDetailsScreen = React.lazy(
  () => import("screens/CityPolygonDetailsScreen")
);

export default function App() {
  useEffect(() => {
    DateUtils.setLog(false);
  }, []);

  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <BrowserRouter>
              <HttpProvider>
                <AuthProvider>
                  <SnackbarProvider
                    maxSnack={3}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                  >
                    <CheckAuth />
                    <InitApp />
                    <HeaderAppBar />
                    <Suspense fallback={<div></div>}>
                      <Routes>
                        <Route path="/" element={<RequireAuth />}>
                          <Route index element={<Navigate to="/home" />} />
                          <Route path="profile" element={<ProfileScreen />} />
                          <Route path="home" element={<HomeScreen />} />
                          <Route path="settings" element={<SettingsScreen />} />
                          <Route path="map" element={<BikesMapScreen />}>
                            <Route
                              path="bikes/:bike_id"
                              element={<BikeDetailsScreen />}
                            >
                              <Route path="edit" element={<BikeEditScreen />} />
                            </Route>
                          </Route>
                          <Route path="trips" element={<TripsScreen />}>
                            <Route
                              path=":trip_id"
                              element={<TripDetailsScreen />}
                            >
                              <Route
                                path="force"
                                element={<TripForceEndScreen />}
                              />
                              <Route
                                path="edit"
                                element={<TripEditStatusScreen />}
                              />
                            </Route>
                          </Route>
                          <Route path="users" element={<UsersScreen />}>
                            <Route
                              path=":user_id"
                              element={<UserDetailsScreen />}
                            />
                          </Route>
                          <Route path="bikes" element={<BikesScreen />}>
                            <Route
                              path=":bike_id"
                              element={<BikeDetailsScreen />}
                            >
                              <Route path="edit" element={<BikeEditScreen />} />
                            </Route>
                          </Route>
                          <Route path="reviews" element={<ReviewsScreen />} />
                          <Route path="discounts" element={<DiscountsScreen />}>
                            <Route
                              path=":discount_id"
                              element={<DiscountDetailsScreen />}
                            />
                          </Route>
                          <Route
                            path="subscriptions"
                            element={<SubscriptionsScreen />}
                          >
                            <Route
                              path=":subscription_id"
                              element={<SubscriptionDetailScreen />}
                            />
                          </Route>
                          <Route path="reports" element={<ReportsScreen />} />
                          <Route path="cautions" element={<CautionsScreen />} />
                          <Route path="roles" element={<RolesScreen />}>
                            <Route
                              path=":role_id"
                              element={<RolesDetailsScreen />}
                            />
                          </Route>
                          <Route path="spots" element={<SpotsScreen />}>
                            <Route
                              path=":spot_id"
                              element={<SpotDetailsScreen />}
                            />
                          </Route>
                          <Route path="red-zones" element={<RedZoneScreen />}>
                            <Route
                              path=":city_id"
                              element={<RedZoneDetailsScreen />}
                            />
                          </Route>
                          <Route
                            path="city-polygon"
                            element={<CityPolygonScreen />}
                          >
                            <Route
                              path=":city_id"
                              element={<CityPolygonDetailsScreen />}
                            />
                          </Route>
                          <Route path="admins" element={<AdminsScreen />}>
                            <Route
                              path=":admin_id"
                              element={<AdminDetailsScreen />}
                            />
                          </Route>
                          <Route path="marketings" element={<CampaignScreen />}>
                            <Route
                              path=":marketing_id"
                              element={<CampaignDetailsScreen />}
                            />
                          </Route>
                          <Route
                            path="notifications"
                            element={<NotificationScreen />}
                          />
                        </Route>
                        <Route path="login" element={<LoginScreen />} />
                      </Routes>
                    </Suspense>
                  </SnackbarProvider>
                </AuthProvider>
              </HttpProvider>
            </BrowserRouter>
          </Provider>
        </ThemeProvider>
      </LocalizationProvider>
    </div>
  );
}
