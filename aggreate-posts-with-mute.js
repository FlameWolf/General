use("quip-db");
db.posts.aggregate([
	{
		$lookup: {
			from: "follows",
			pipeline: [
				{
					$match: {
						followedBy: ObjectId("620bc9f8040b5f4be75f1c42")
					}
				},
				{
					$group: {
						_id: undefined,
						result: {
							$addToSet: "$user"
						}
					}
				}
			],
			as: "following"
		}
	},
	{
		$addFields: {
			following: {
				$arrayElemAt: ["$following.result", 0]
			}
		}
	},
	{
		$match: {
			$expr: {
				$in: ["$author", "$following"]
			}
		}
	},
	{
		$unset: "following"
	},
	{
		$lookup: {
			from: "mutedwords",
			pipeline: [
				{
					$match: {
						mutedBy: ObjectId("62231468657e15818a0b88a3")
					}
				},
				{
					$project: {
						_id: 0,
						regEx: {
							$switch: {
								branches: [
									{
										case: {
											$eq: [ "$match", "startsWith" ]
										},
										then: {
											$concat: [
												"\\W+",
												"$word",
												".*"
											]
										}
									},
									{
										case: {
											$eq: [ "$match", "endsWith" ]
										},
										then: {
											$concat: [
												"\w*",
												"$word",
												"(\\W+|$)"
											]
										}
									},
									{
										case: {
											$eq: [ "$match", "exact" ]
										},
										then: {
											$concat: [
												"\\W+",
												"$word",
												"(\\W+|$)"
											]
										}
									}
								],
								default: "$word"
							}
						}
					}
				},
				{
					$group: {
						_id: undefined,
						result: {
							$addToSet: "$regEx"
						}
					}
				}
			],
			as: "mutedWords"
		}
	},
	{
		$addFields: {
			mutedWords: {
				$arrayElemAt: ["$mutedWords.result", 0]
			}
		}
	},
	{
		$match: {
			$expr: {
				$eq: [
					{
						$filter: {
							input: "$mutedWords",
							cond: {
								$regexMatch: {
									input: "$content",
									regex: "$$this",
									options: "i"
								}
							}
						}
					},
					[]
				]
			}
		}
	},
	{
		$unset: ["mutedWords"]
	},
	{
		$sort: {
			createdAt: -1
		}
	}
]);
