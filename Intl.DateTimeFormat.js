new Intl.DateTimeFormat
(
	"default",
	{
		weekday: "long",
		era: "short",
		year: "numeric",
		month: "long",
		day: "2-digit",
		dayPeriod: "long",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		fractionalSecondDigits: 3,
		timeZoneName: "short",
		timeZone: "UTC",
		hour12: false,
		formatMatcher: "basic"
	}
)
.format(new Date());