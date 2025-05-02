import { gql } from "@apollo/client";

export const GET_THEME_SETTINGS = gql`
  query GetThemeSettings {
    themeGeneralSettings {
      options {
        grupoLogin {
          imagen {
            mediaItemUrl
          }
          descripcion1
          descripcion2
          cta {
            target
            title
            url
          }
          logo {
            mediaItemUrl
          }
        }
      }
    }
  }
`; 