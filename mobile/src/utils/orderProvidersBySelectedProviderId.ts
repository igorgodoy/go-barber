interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface Params {
  providers: Provider[];
  selectedProviderId: string;
}

export default function orderProvidersBySelectedProviderId({
  providers,
  selectedProviderId,
}: Params): Provider[] {
  const selectedProviderIndex = providers.findIndex(
    provider => provider.id === selectedProviderId,
  );

  if (selectedProviderIndex === 0) {
    return providers;
  }

  const orderedProviders: Provider[] = [
    providers[selectedProviderIndex],
    ...providers.filter(provider => provider.id !== selectedProviderId),
  ];

  return orderedProviders;
}
