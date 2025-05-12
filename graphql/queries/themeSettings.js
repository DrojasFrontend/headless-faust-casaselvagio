import { gql } from "@apollo/client";

export const GET_THEME_SETTINGS = gql`
  query GetThemeSettings {
    themeGeneralSettings {
      options {
        grupoLogin {
          video {
            mediaItemUrl
          }
          imagen {
            mediaItemUrl
            altText
            title
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