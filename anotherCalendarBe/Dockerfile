FROM mcr.microsoft.com/dotnet/aspnet:7.0-alpine AS base
WORKDIR /app
EXPOSE 80


FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine AS build
WORKDIR /src
COPY ["anotherCalendarBe.csproj", "./"]
RUN dotnet restore "anotherCalendarBe.csproj"
COPY . .
RUN dotnet publish "anotherCalendarBe.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "anotherCalendarBe.dll"]
