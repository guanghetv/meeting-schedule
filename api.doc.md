# api doc

## 获取所有会议室

### GET /meeting/all-meeting-room

```javascript
respone body
[
    {
        id: string, // 会议室id
        name: string, // 会议室名称，默认空字符串
        type: string, // 会议室类型，默认空字符串
        description: string // 会议室描述，默认空字符串
    } ...
]
```

***

## 获取某个会议室两周的预定状态

### GET /state/meeting-state/room/:roomId

```javascript
response body
[
    {
        description: string, // 预定会议室的简短描述（包括预定者和预定用途）
        beginTime: string, // 预定会议室的开始占用时间
        endTime: string, // 预定会议室的结束占用时间
        day: string, // 哪一天的记录
        id: string, // 会议预定记录的id,
        userId: string, // 用户id，目前为空
        roomId: string // 会议室id
    }
]
```

***

## 删除某个会议室的预定状态(stateId为会议预定记录的id)

### DELETE /state/meeting-state/room/:roomId/state/:stateId

response 204

***

## 创建/修改某个会议室的预定状态

### PUT /state/meeting-state

```javascript
request body
{
    description: string, // 预定会议室的简短描述（包括预定者和预定用途）
    beginTime: string, // 预定会议室的开始占用时间
    endTime: string, // 预定会议室的结束占用时间
    day: string, // 哪一天的记录
    id: string, // 会议预定记录的id (如果是创建，则没有此字段，因为创建成功后才会产生id。)
    userId: string, // 用户id，目前为空
    roomId: string // 会议室id
}

response
created state id or 204
```