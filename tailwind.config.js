const plugin = require('tailwindcss/plugin')

// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    screens: {
      xs: '550px',
      sm: '640px',
      md: '768px',
      mdd: '900px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1590px',
    },
    extend: {
      zIndex: {
        '-1': '-1',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
        1000: '1000',
        1001: '1001',
        1002: '1002',
        1003: '1003',
        1004: '1004',
        1005: '1005',
        1006: '1006',
        1007: '1007',
        1008: '1008',
        1009: '1009',
        1010: '1010',
      },
      inset: {
        '5%': '5%',
        '10%': '10%',
        '15%': '15%',
        '20%': '20%',
        '30%': '30%',
        '35%': '35%',
        '40%': '40%',
        '45%': '45%',
        '55%': '55%',
        '60%': '60%',
        '65%': '65%',
        '70%': '70%',
        '80%': '80%',
        '85%': '85%',
        '80%': '80%',
        '95%': '95%',
      },
      gap: {
        1.25: '0.313rem',
        2.5: '0.688rem',
      },
      grayscale: ['hover', 'focus'],
      spacing: {
        1.25: '0.281rem',
        4.5: '1.125rem',
        5.5: '1.375rem',
        6.5: '1.625rem',
        7.5: '1.875rem',
        7.6: '1.938rem',
        9.5: '2.375rem',
        10.25: '2.563rem',
        18: '4.5rem',
        22: '5.375rem',
        22.5: '5.5rem',
        65: '16.375rem',
        65.5: '16.563rem',
        67: '16.75rem',
        77: '18.875rem',
        85: '21.25rem',
        87: '22.5rem',
        104: '26rem',
        108: '27.5rem',
        120: '30.75rem',
        128: '32rem',
        160: '40rem',
        165: '40.563rem',
        460: '28.75rem',
        '3px': '0.1875rem',
        max: 'max-content',
        min: 'min-content',
      },
      minHeight: (theme) => ({
        ...theme('spacing'),
        'half-screen': '50vh',
        '2/3-screen': '66vh',
      }),
      maxHeight: (theme) => ({
        ...theme('spacing'),
      }),
      width: {
        22: '5.5rem',
        268: '16.75rem',
        310: '19.375rem',

        325: '20.313rem',
        864: '54rem',
        1210: '75.625rem',
      },
      height: {
        446: '27.875rem',
        462: '28.875rem',
      },
      order: {
        13: '13',
        14: '14',
        15: '15',
        16: '16',
        17: '17',
        18: '18',
        19: '19',
        20: '20',
        21: '21',
        22: '22',
        23: '23',
        24: '24',
      },
      maxWidth: (theme) => ({
        ...theme('spacing'),
        '8xl': '88rem',
      }),
      minWidth: (theme) => ({
        ...theme('spacing'),
      }),
      borderWidth: {
        0.5: '0.5px',
        3: '3px',
        6: '6px',
      },
      colors: {
        '#00ACEE': '#00ACEE',
        '#0C0B0C': '#0C0B0C',
        '#131313': '#131313',
        '#141414': '#141414',
        '#151515': '#151515',
        '#171717': '#171717',
        '#171815': '#171717',
        '#202020': '#202020',
        '#2A2A2A': '#2A2A2A',
        '#232323': '#232323',
        '#242424': '#242424',
        '#272727': '#272727',
        '#292929': '#292929',
        '#2B2B2B': '#2B2B2B',
        '#3A3A3A': '#3A3A3A',
        '#313131': '#313131',
        '#323232': '#323232',
        '#343434': '#343434',
        '#363636': '#363636',
        '#373737': '#373737',
        '#383838': '#383838',
        '#404040': '#404040',
        '#415528': '#415528',
        '#4B4B4B': '#4B4B4B',
        '#3B3B3B': '#3B3B3B',
        '#555555': '#555555',
        '#5B59D1': '#5B59D1',
        '#5865F2': '#5865F2',
        '#646464': '#646464',
        '#6A6A6A': '#6A6A6A',
        '#6B6B6B': '#6B6B6B',
        '#6C6C6C': '#6C6C6C',
        '#7289DA': '#7289DA',
        '#747474': '#747474',
        '#767676': '#767676',
        '#79E5F3': '#79E5F3',
        '#7A7A7A': '#7A7A7A',
        '#815CEA': '#815CEA',
        '#878787': '#878787',
        '#8D8D8D': '#8D8D8D',
        '#8FA56F': '#8FA56F',
        'd-gray': '#909090',
        '#919191': '#919191',
        '#949494': '#949494',
        '#9E9E9E': '#9E9E9E',
        '#ADADAD': '#ADADAD',
        '#ADD8FF': '#ADD8FF',
        '#AAD079': '#AAD079',
        '#A9C58A': '#A9C58A',
        '#AFAFAF': '#AFAFAF',
        '#BA274A32': '#BA274A32',
        '#101B21': '#101B21',
        '#0F1B21': '#0F1B21',
        '#352200': '#352200',
        '#DEDEDE': '#DEDEDE',
        '#8978BD': '#8978BD',
        '#6DA5FA': '#6DA5FA',
        '#929292': '#929292',
        '#1D1D1D': '#1D1D1D',
        '#D35B5B': '#D35B5B',
        '#FF3939': '#FF3939',
        '#FF7373': '#FF7373',
        '#9CEC35': '#9CEC35',
        '#717171': '#717171',
        '#2272FF': '#2272FF',
        '#BBD6FF': '#BBD6FF',
        '#0A9C55': '#0A9C55',
        '#1F1F1F': '#1F1F1F',
        '#22372A': '#22372A',
        '#F0F0F0': '#F0F0F0',
        '#E3E3E3': '#E3E3E3',
        '#8C8C8C': '#8C8C8C',
        '#6BE897': '#6BE897',
        '#F7CC63': '#F7CC63',
        '#213829': '#213829',
        '#000000': '#000000',
        '#D44D4D': '#D44D4D',
        '#8F8F8F': '#8F8F8F',
        '#F13131': '#F13131',
        '#9BEC35': '#9BEC35',
        '#111111': '#111111',
        '#5A6B00': '#5A6B00',
        '#353F00': '#353F00',
        '#353535': '#353535',
        '#8D3333': '#8D3333',
        '#8322FF': '#8322FF',
        '#2081E2': '#2081E2',
        '#161616': '#161616',
        '#DBCEFF': '#DBCEFF',
        '#B7B7B7': '#B7B7B7',
        '#848484': '#848484',
        '#505050': '#505050',
        '#3E3E3E': '#3E3E3E',
        '#0047FF': '#0047FF',
        '#EC4035': '#EC4035',
        '#CFEC35': '#CFEC35',
        '#00A96C': '#00A96C',
        '#00FFA3': '#00FFA3',
        '#BE5B00': '#BE5B00',
        '#FFC895': '#FFC895',
        '#9C4EFF': '#9C4EFF',
        '#535353': '#535353',
        '#7000FF': '#7000FF',
        '#38cae4': '#38cae4',
        '#B9D5FF': '#B9D5FF',
        '#5F9FFF': '#5F9FFF',
        '#BFFF6C': '#BFFF6C',
        '#7DB1FF': '#7DB1FF',
        '#262626': '#262626',
        '#9C9C9C': '#9C9C9C',
        '#161F2D': '#161F2D',
        '#23416F': '#23416F',
        '#8FFC02': '#8FFC02',
        '#3B6900': '#3B6900',
        '#222222': '#222222',
        '#BCBCBC': '#BCBCBC',
        '#3C3C3C': '#3C3C3C',
        '#CCCCCC': '#CCCCCC',
        '#CF8383': '#CF8383',
        '#D2FF99': '#D2FF99',
        '#D8D3D3': '#D8D3D3',
        '#F28C28': '#F28C28',
        '#F38B8B': '#F38B8B',
        '#FCFFF9': '#FCFFF9',
        '#FF00C8': '#FF00C8',
        '#FF7778': '#FF7778',
        '#FFA756': '#FFA756',
        '#FFBCCC': '#FFBCCC',
        '#FFD977': '#FFD977',
        '#5F5F5F': '#5F5F5F',
        '#0066FF': '#0066FF',
        '#4F95FF': '#4F95FF',
        '#1E1E1E': '#1E1E1E',
        '#101010': '#101010',
        '#ff356629': '#ff356629',
        '#193052': '#193052',
        '#FFE500': '#FFE500',
        '#FF416F': '#FF416F',
        'd-dark-40': '#222222',
        'd-dark-60': '#111111',
        'd-dark-70': '#181818',
        'd-dark-90': '#151515',
        'd-red-60': '#CF8383',
        'd-red-80': '#FF6C6C',
        'd-gray-50': '#383838',
        'd-gray-80': '#595959',
        'd-gray-100': '#808080',
        'd-green-80': '#D2FF99',
        'd-green-100': '#C0FF70',
        'd-green-200': '#3C5123',
        'd-stroke-100': '#1E1D1D',
        't-gray': '#B0B0B0',
        't-black': '#101010',
        't-menu-gray': '#1E1E1E',
        purplenit: '#815CEA',
        traitheader: '#505277',
        traitresetbutton: '#9A9CC4',
        traitresetborder: '#D4DAFF',
        traitfiltersearchbg: '#262A44',
        traitlistrowhoverbg: '#0f0f1a73',
        traitfilterlistborder: '#757FC1',
        traitfiltertext: '#DADAFF',
        traitfilterboxbg: '#373855',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        'ibm-plex-mono': ['IBM Plex Mono', 'monospace'],
        sora: ['Sora', 'sans-serif'],
        rubik: ['Rubik One', 'sans-serif'],
      },
      fontSize: {
        xxs: '0.625rem',
        '21px': '1.3125rem',
        '13px': '0.8125rem',
      },
      lineHeight: {
        2.5: '10px',
        3.25: '13px',
        3.5: '0.875rem',
        4.5: '1.125rem',
        4.75: '1.188rem',
        5.25: '1.3125rem',
        5.5: '1.375rem',
        6.25: '1.563rem',
        7.25: '1.813rem',
        12: '3rem',
        14.5: '3.625rem',
        21.5: '5.375rem',
      },
      letterSpacing: {
        0.02: '0.02em',
        0.04: '0.04em',
        0.06: '0.06em',
        0.08: '0.08em',
        '-0.04': '-0.04em',
      },
      borderRadius: {
        3: '0.1875rem',
        1: '0.0625rem',
        10: '0.625rem',
        32: '2rem',
      },
      backgroundSize: {
        '50%': '50%',
        16: '4rem',
        92.5: '23.125rem',
      },
    },
  },
  variants: {
    extend: {
      padding: ['hover', 'disabled', 'group-hover'],
      visibility: ['hover', 'focus', 'group-hover'],
      display: ['hover', 'focus', 'group-hover'],
      opacity: ['disabled'],
      cursor: ['disabled'],
      backgroundColor: ['disabled', 'odd', 'even'],
      backgroundOpacity: ['disabled'],
      textColor: ['disabled'],
      borderColor: ['disabled'],
      textAlign: ['hover', 'focus', 'odd', 'even'],
      justifyContent: ['hover', 'focus', 'odd', 'even'],
      alignItems: ['hover', 'focus', 'odd', 'even'],
      maxWidth: ['responsive'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@themesberg/flowbite/plugin'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        /* width */
        '::-webkit-scrollbar': {
          width: '3px',
          height: '7px',
        },
        '::-webkit-scrollbar-track': {
          'box-shadow': 'inset 0 0 5px #292929',
          'border-radius': '10px',
        },
        '::-webkit-scrollbar-thumb': {
          background: '#474747',
          'border-radius': '10px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: '#868686',
        },
        '::-webkit-scrollbar-corner': {
          background: 'transparent',
        },
      })
    }),
  ],
}
