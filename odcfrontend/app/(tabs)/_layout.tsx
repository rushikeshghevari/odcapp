// import { Ionicons } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Tabs, useFocusEffect } from "expo-router";
// import React, { useCallback, useState } from "react";
// import { Platform, Text } from "react-native";

// import { HapticTab } from "@/components/haptic-tab";

// type UserRole = "superadmin" | "user";

// type LoggedInUser = {
//   id: string;
//   name: string;
//   mobileNo: string;
//   role: UserRole;
// };

// function TabLabel({
//   focused,
//   title,
// }: {
//   focused: boolean;
//   title: string;
// }) {
//   return (
//     <Text
//       style={{
//         fontSize: 10,
//         fontWeight: focused ? "700" : "500",
//         color: focused ? "#c1121f" : "#8a8a8a",
//         marginTop: 2,
//       }}
//     >
//       {title}
//     </Text>
//   );
// }

// export default function TabLayout() {
//   const [role, setRole] = useState<UserRole | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useFocusEffect(
//     useCallback(() => {
//       async function loadLoggedInUser() {
//         try {
//           const storedUser = await AsyncStorage.getItem("loggedInUser");

//           if (storedUser) {
//             const parsedUser = JSON.parse(storedUser) as LoggedInUser;
//             setRole(parsedUser.role);
//           } else {
//             setRole(null);
//           }
//         } catch (error) {
//           console.log("Failed to load logged in user:", error);
//           setRole(null);
//         } finally {
//           setIsLoading(false);
//         }
//       }

//       loadLoggedInUser();
//     }, [])
//   );

//   if (isLoading) {
//     return null;
//   }

//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarButton: (props) => <HapticTab {...props} />,
//         tabBarActiveTintColor: "#000000",
//         tabBarInactiveTintColor: "#8a8a8a",

//         tabBarHideOnKeyboard: false,

//         tabBarStyle: {
//           height: Platform.OS === "ios" ? 88 : 70,
//           paddingTop: 8,
//           paddingBottom: Platform.OS === "ios" ? 24 : 8,
//           backgroundColor: "#ffffff",
//           borderTopWidth: 1,
//           borderTopColor: "#e5e5e5",
//           elevation: 0,
//           shadowOpacity: 0,
//         },

//         tabBarIconStyle: {
//           marginTop: 2,
//         },
//       }}
//     >
//       <Tabs.Screen
//         name="home/index"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ focused }) => (
//             <Ionicons
//               name={focused ? "home" : "home-outline"}
//               size={22}
//               color={focused ? "#000000" : "#8a8a8a"}
//             />
//           ),
//           tabBarLabel: ({ focused }) => (
//             <TabLabel focused={focused} title="Home" />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="history/index"
//         options={{
//           title: "History",
//           tabBarIcon: ({ focused }) => (
//             <Ionicons
//               name={focused ? "time" : "time-outline"}
//               size={22}
//               color={focused ? "#000000" : "#8a8a8a"}
//             />
//           ),
//           tabBarLabel: ({ focused }) => (
//             <TabLabel focused={focused} title="History" />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="account/index"
//         options={{
//           title: "Account",
//           tabBarIcon: ({ focused }) => (
//             <Ionicons
//               name={focused ? "person" : "person-outline"}
//               size={22}
//               color={focused ? "#000000" : "#8a8a8a"}
//             />
//           ),
//           tabBarLabel: ({ focused }) => (
//             <TabLabel focused={focused} title="Account" />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="settings"
//         options={{
//           title: "Settings",
//           href: role === "superadmin" ? undefined : null,
//           tabBarIcon: ({ focused }) => (
//             <Ionicons
//               name={focused ? "settings" : "settings-outline"}
//               size={22}
//               color={focused ? "#000000" : "#8a8a8a"}
//             />
//           ),
//           tabBarLabel: ({ focused }) => (
//             <TabLabel focused={focused} title="Settings" />
//           ),
//         }}
//       />

//       {/* Hide extra routes from bottom tabs */}
//       <Tabs.Screen
//         name="account/privacyPolicy"
//         options={{
//           href: null,
//         }}
//       />

//       <Tabs.Screen
//         name="account/termsConditions"
//         options={{
//           href: null,
//         }}
//       />

//       <Tabs.Screen
//         name="index"
//         options={{
//           href: null,
//         }}
//       />

//       <Tabs.Screen
//         name="explore"
//         options={{
//           href: null,
//         }}
//       />
//     </Tabs>
//   );
// }
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/haptic-tab";

type UserRole = "superadmin" | "user";

type LoggedInUser = {
  id: string;
  name: string;
  mobileNo: string;
  role: UserRole;
};

function TabLabel({
  focused,
  title,
}: {
  focused: boolean;
  title: string;
}) {
  return (
    <Text
      style={{
        fontSize: 10,
        fontWeight: focused ? "700" : "500",
        color: focused ? "#c1121f" : "#8a8a8a",
        marginTop: 2,
      }}
    >
      {title}
    </Text>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      async function loadLoggedInUser() {
        try {
          const storedUser = await AsyncStorage.getItem("loggedInUser");

          if (storedUser) {
            const parsedUser = JSON.parse(storedUser) as LoggedInUser;
            setRole(parsedUser.role);
          } else {
            setRole(null);
          }
        } catch (error) {
          console.log("Failed to load logged in user:", error);
          setRole(null);
        } finally {
          setIsLoading(false);
        }
      }

      loadLoggedInUser();
    }, [])
  );

  if (isLoading) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarButton: (props) => <HapticTab {...props} />,

        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#8a8a8a",

        tabBarHideOnKeyboard: true,

        tabBarStyle: {
          height: 58 + insets.bottom,
          paddingTop: 6,
          paddingBottom: Math.max(insets.bottom, 10),
          paddingHorizontal: 6,

          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#e5e5e5",

          elevation: 10,
          shadowOpacity: 0.08,
        },

        tabBarItemStyle: {
          minHeight: 44,
          paddingVertical: 2,
        },

        tabBarIconStyle: {
          marginTop: 2,
        },

        tabBarLabelPosition: "below-icon",
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={22}
              color={focused ? "#000000" : "#8a8a8a"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <TabLabel focused={focused} title="Home" />
          ),
        }}
      />

      <Tabs.Screen
        name="history/index"
        options={{
          title: "History",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "time" : "time-outline"}
              size={22}
              color={focused ? "#000000" : "#8a8a8a"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <TabLabel focused={focused} title="History" />
          ),
        }}
      />

      <Tabs.Screen
        name="account/index"
        options={{
          title: "Account",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={22}
              color={focused ? "#000000" : "#8a8a8a"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <TabLabel focused={focused} title="Account" />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          href: role === "superadmin" ? undefined : null,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={22}
              color={focused ? "#000000" : "#8a8a8a"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <TabLabel focused={focused} title="Settings" />
          ),
        }}
      />

      {/* Hidden routes */}
      <Tabs.Screen
        name="account/privacyPolicy"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="account/termsConditions"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
