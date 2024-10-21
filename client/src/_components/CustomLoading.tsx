import {Container, LoadingOverlay} from "@mantine/core";

const CustomLoading = () => {
  return (
    <Container>
      <LoadingOverlay
        visible={true}
        zIndex={1000}
        overlayProps={{radius: 'sm', blur: 2}}
        loaderProps={{color: 'pink', type: 'bars'}}
        data-testid="custom-loading-overlay"
      />
    </Container>
  )
}
export default CustomLoading;