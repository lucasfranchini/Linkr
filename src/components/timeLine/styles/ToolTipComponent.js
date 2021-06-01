import { createMuiTheme } from '@material-ui/core/styles';

const ToolTipComponent = createMuiTheme({
    overrides: {
        MuiTooltip: {
            arrow: {
                "&:before": {
                  border: "none"
                },
                color: 'rgba(255, 255, 255, 0.9)'
              },
          tooltip: {
            fontFamily: 'Lato',
            fontSize: '11px',
            fontWeight: 700,
            lineHeight: '13px',
            letterSpacing: '0em',
            color: "#505050",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: '3px',
          }
        }
      },
  });
  export {ToolTipComponent}