---
sidebar_position: 2
---
# Voucherly .NET SDK

[![NuGet](https://img.shields.io/nuget/v/voucherly.sdk.svg)](https://www.nuget.org/packages/Voucherly.Sdk/)
[![Relaease](https://github.com/voucherly/voucherly-dotnet-sdk/actions/workflows/publish-nuget.yml/badge.svg)](https://github.com/voucherly/voucherly-dotnet-sdk/actions?query=event%3Arelease)

The official [Voucherly][voucherly] .NET library, supporting .NET 6.0+.

## Installation

Using the [.NET Core command-line interface (CLI) tools][dotnet-core-cli-tools]:

```sh
dotnet add package Voucherly.Sdk
```

Using the [NuGet Command Line Interface (CLI)][nuget-cli]:

```sh
nuget install Voucherly.Sdk
```

Using the [Package Manager Console][package-manager-console]:

```powershell
Install-Package Voucherly.Sdk
```

From within Visual Studio:

1. Open the Solution Explorer.
2. Right-click on a project within your solution.
3. Click on *Manage NuGet Packages...*
4. Click on the *Browse* tab and search for Voucherly.Sdk".
5. Click on the Voucherly.Sdk package, select the appropriate version in the
   right-tab and click *Install*.

## Documentation

For a comprehensive list of examples, check out the [API documentation][api-docs].

## Development

For any requests, bug or comments, please [open an issue][issues] or [submit a pull request][pulls].

[api-docs]: https://docs.voucherly.it
[dotnet-core-cli-tools]: https://docs.microsoft.com/en-us/dotnet/core/tools/
[issues]: https://github.com/voucherly/voucherly-dotnet-sdk/issues/new
[nuget-cli]: https://docs.microsoft.com/en-us/nuget/tools/nuget-exe-cli-reference
[package-manager-console]: https://docs.microsoft.com/en-us/nuget/tools/package-manager-console
[pulls]: https://github.com/voucherly/voucherly-dotnet-sdk/pulls
[voucherly]: https://voucherly.it