import { Box } from "components";

// Images
import backgroundImage from "assets/images/bg-profile.jpg";

// banner image layout
function BannerImage(): JSX.Element {
  return (
    <Box
      display="flex"
      alignItems="center"
      position="relative"
      minHeight="18.75rem"
      borderRadius="xl"
      sx={{
        backgroundImage: ({
          functions: { rgba, linearGradient },
          palette: { gradients },
        }) =>
          `${linearGradient(
            rgba(gradients.info.main, 0.6),
            rgba(gradients.info.state, 0.6)
          )}, url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "50%",
        overflow: "hidden",
      }}
    />
  );
}

export default BannerImage;
